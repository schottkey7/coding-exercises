# coding=utf-8
"""
Gives a quote for the requested amount after taking into consideration
all offers currently available.
"""
from argparse import ArgumentParser, RawTextHelpFormatter
from operator import itemgetter
import unittest
import os
from timeit import timeit


# ------------------------------------------------------------------------------
# TESTS
# ------------------------------------------------------------------------------

def wrapper(func, *test_args, **test_kwargs):
    # pylint: disable=W0142
    """
    Wrapper for functions requiring args in timeit.
    """
    def wrapped():
        return func(*test_args, **test_kwargs)
    return wrapped


def generate_test_market_data(**opts):
    try:
        import numpy as np
    except ImportError:
        raise ImportError("[ERROR] Testing and statistics modes require numpy to be installed.")
    # pylint: disable=E1101
    """
    Generates test market data and stores it in a csv file.
    """

    with open(opts['file'], 'w') as wr:
        wr.write('rate, available\n')
        for _ in range(opts['rows_to_generate']):
            wr.write('%.4f, %d\n' % (
                np.random.uniform(opts['rate_floor'], opts['rate_ceil']),
                np.random.randint(
                    opts['avail_floor'] / 10, (opts['avail_ceil'] + 1) / 10
                ) * 10
            ))


class TestFindBestLoan(unittest.TestCase):
    # pylint: disable=R0904,W0142

    """Unit tests for getting the best quote."""

    def test_invalid_requests(self):

        opts = {
            'file': 'market_test.csv',
            'rate_col': 'rate',
            'avail_col': 'available',
            'avail_floor': 100,
            'avail_ceil': 300,
            'rate_floor': 0.05,
            'rate_ceil': 0.08,
            'rows_to_generate': 1000
        }
        generate_test_market_data(**opts)

        with self.assertRaises(AssertionError):
            for loan in [900, 0, -100, 1001, '123', 15001, 14999]:
                get_quote(loan, opts['file'], opts['rate_col'], opts['avail_col'])

            get_quote(1050, 'invalid.csv', opts['rate_col'], opts['avail_col'])


# ------------------------------------------------------------------------------
# STATISTICS
# ------------------------------------------------------------------------------
class FindBestLoanStats(object):
    # pylint: disable=W0142

    """ Display statistics. """

    def __init__(self):
        self.file = 'market_test.csv'
        self.rate_col = 'rate'
        self.avail_col = 'available'
        # Minimum available amount
        self.avail_floor = 100
        # Maximum available amount
        self.avail_ceil = 5000
        # Minimum available rate
        self.rate_floor = 0.04
        # Maximum available rate
        self.rate_ceil = 0.09
        self.rows_to_generate = 1000
        self.timer_runs = 100
        self.terms = 36

        opts = {
            'file': self.file,
            'rate_col': self.rate_col,
            'avail_col': self.avail_col,
            'avail_floor': self.avail_floor,
            'avail_ceil': self.avail_ceil,
            'rate_floor': self.rate_floor,
            'rate_ceil': self.rate_ceil,
            'rows_to_generate': self.rows_to_generate
        }
        print '\n============= Statistics =============='
        generate_test_market_data(**opts)
        self.test_valid_loans()
        self.test_time_taken()
        print '\n'

    def test_valid_loans(self):
        test_loans = [1000, 1500, 5600, 1700, 14000, 15000]
        print '\nGetting %d test loan quotes' % len(test_loans)
        print '-' * 39
        for loan in test_loans:
            get_quote(loan, self.file, self.rate_col, self.avail_col)

    def test_time_taken(self):
        print '\nTime taken per function for %d runs' % self.timer_runs
        print '-' * 39

        wrapped = wrapper(read_market_data, self.file, self.rate_col, self.avail_col)
        print "\n--> Time taken by read_market_data: %.4f s" \
            % timeit(wrapped, number=self.timer_runs)

        wrapped = wrapper(compute_monthly_payment, 1000, 0.07, self.terms)
        print "--> Time taken by compute_monthly_payment: %.4f s" \
            % timeit(wrapped, number=self.timer_runs)

        market_data = read_market_data(self.file, self.rate_col, self.avail_col)
        wrapped = wrapper(get_best_offers, market_data, 1500)
        print "--> Time taken by get_best_offers: %.4f s"\
            % timeit(wrapped, number=self.timer_runs)

        best_offers = get_best_offers(market_data, 5000)
        if len(best_offers):
            wrapped = wrapper(get_repayment_plan, 5000, best_offers,
                              self.terms, debug=True)
            print "--> Time taken by get_repayment_plan: %.4f s" \
                % timeit(wrapped, number=self.timer_runs)


# ------------------------------------------------------------------------------
# GET A QUOTE
# ------------------------------------------------------------------------------
def compute_monthly_payment(P, R, N):
    """

    :int    : P (loan amount, principal amount)
    :float  : R (interest rate, e.g. 0.05 for 5%)
    :int    : N (number of terms - months)

    """
    r = (R * 100) / 1200
    return (P*r*(1 + r)**N) / ((1 + r)**N - 1)


def read_market_data(filename, rate_col, avail_col):
    # pylint: disable=W0141
    """
    :str : filename (filename of market data csv data)
    :str : rate_col (rate column in  the csv file
    :str : avail_col (availabile amounts column in the csv file

    """
    market_data = []
    with open(filename, 'r') as freader:
        headers = [
            col.strip().lower()
            for col in freader.readline().strip().split(',')
        ]
        try:
            rate = headers.index(rate_col.lower())
            avail = headers.index(avail_col.lower())
        except ValueError:
            print "[ERROR] Some of the supplied column names were not found."
            return -1
        for line in freader.readlines():
            line = line.strip().split(',')
            try:
                market_data.append(map(float, [line[rate], line[avail]]))
            except ValueError:
                print "[WARNING] Could not gather the required information \
                        from line %s. Skipping." % line
    return market_data


def get_weighed_average(best_offers):
    rates, weights = zip(*best_offers)
    sum_weights = sum(weights)

    if sum_weights:
        return sum([rate * weight for rate, weight in best_offers]) / sum_weights
    else:
        length = len(best_offers)
        return sum(rates) / length


def get_repayment_plan(loan, best_offers, terms, debug=False):

    """
    :int    : loan amount
    :list   : best_offers
    :int    : terms (number of months)

    """
    monthly_payment = 0
    avg_rate = get_weighed_average(best_offers)

    for rate, partial_loan in best_offers:
        monthly_payment += compute_monthly_payment(partial_loan, rate, terms)

    if not debug:
        print '\n-- Quote -- '
        print "\nRequested amount: £%d" % loan
        print "Rate: %.1f %%" % (avg_rate * 100)
        print "Monthly repayment: £%.2f" % monthly_payment
        print "Total repayment: £%.2f\n" % (monthly_payment * terms)


def get_best_offers(market_data, loan):
    """
    :list   : market_data (2d array of market data)
    :int    : loan

    """
    borrowed = 0
    offers = []

    # Sort market data by rate in ascending order
    market_data.sort(key=itemgetter(0))

    for rate, available in market_data:
        if borrowed + available < loan:
            borrowed += available
            offers.append((rate, available))
        elif borrowed + available == loan:
            borrowed += available
            offers.append((rate, available))
            break
        else:
            offers.append((rate, loan - borrowed))
            borrowed = loan
            break

    if borrowed == loan:
        return offers

    return []


def get_quote(loan, filename, rate_col, avail_col):
    """

    :int : loan (loan amount)
    :str : file (file containing market data)
    :str : rate_col (optional - rate col name in csv file
    :str : avail_col (optional - available amounts col name in csv

    """

    assert type(loan) is int, "Loan should be an integer"
    assert 1000 <= loan <= 15000, "Loan amount should be in range 1000 - 15000"
    assert loan % 100 == 0, "Loan amount should be a multiple of 100"
    assert os.path.isfile(filename), "Specified input file does not exist"

    # Number of months
    terms = 36

    # Read market data into an array
    market_data = read_market_data(filename, rate_col, avail_col)

    # Get the lowest rate from the available offers
    if market_data != -1:
        if len(market_data):
            best_offers = get_best_offers(market_data, loan)

            if not len(best_offers):
                print "The market has insufficient offers to satisfy a loan of %d." % loan
            else:
                get_repayment_plan(loan, best_offers, terms)
        else:
            print "The market file does not contain any data."


# ------------------------------------------------------------------------------
# MAIN
# ------------------------------------------------------------------------------
if __name__ == '__main__':
    description = """
        -- Description --
        Calculates a quote based on a loan amount for 36 months by examining
        the pool of lenders and finding the best match according to the rate
        that is offered.

        -- Constraints --
        It expects a csv file with at least the following required columns:
        rate and available. Rate is expected as a floating point number between
        0 and 1, e.g. 0.07 for 7%. Available is expected as an integer. It also
        expects a loan amount between 1500 and 15000.

        -- Output --
        The script will print the following information if the request is
        successful:

        Requested amount: £XXXX
        Rate: X.X%
        Monthly repayment: £XXXX.XX
        Total repayment: £XXXX.XX

        where the requested amount is the loan input amount, the rate is the
        average of the rates of the taken offers, monthly repayment is the
        amount that is paid on a monthly basis and the total repayment is the
        total repayment amount. If a match cannot be found, the script will
        output the following: "The market has insufficient offers to
        satisfy this loan.
    """
    parser = ArgumentParser(description=description,
                            formatter_class=RawTextHelpFormatter)
    parser.add_argument('-f', '--file', type=str, help='Input file with market data in csv format')
    parser.add_argument('-l', '--loan', type=int, help='Loan amount for the quote between £1000 and £15000')
    parser.add_argument('--ratecol', type=str, help='File column name for rate data. Default: rate')
    parser.add_argument('--availcol', type=str, help='File column name for availability data. Default: available')
    parser.add_argument('-t', '--test', action="store_true", help="Test mode")
    parser.add_argument('-s', '--stats', action="store_true", help="Statistics mode")
    parser.set_defaults(test=False, ratecol='rate', availcol='available')

    args = parser.parse_args()

    if not (args.stats or args.test) and (None in [args.loan, args.file]):
        raise AssertionError("Flags -f and -l are required. Run with -h for more information")

    if args.test:
        runner = unittest.TextTestRunner()
        suite = unittest.TestLoader().loadTestsFromTestCase(TestFindBestLoan)
        runner.run(suite)
    if args.stats:
        FindBestLoanStats()

    if None not in [args.loan, args.file]:
        get_quote(args.loan, args.file, args.ratecol, args.availcol)
