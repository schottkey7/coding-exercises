# coding=utf-8
from random import choice, randint
from datetime import datetime, timedelta
import re

try:
    import pandas as pd
except ImportError:
    raise ImportError("This script requires pandas to work.")


def generate_test_data(num_bikes, num_stations, max_hours, journeys, output):
    """
    Generate a test dataset.

    :int    : num_bikes (amount of bikes to generate)
    :int    : num_stations (amount of stations to use)
    :int    : max_hours (max hours a journey can last)
    :int    : journeys (max journeys per bike)
    :string : output (output file name)
    """
    stations = ["ST-%s" % n for n in range(1, num_stations + 1)]
    bikes = ["BK-%s" % n for n in range(1, num_bikes + 1)]

    with open(output, 'w') as wr:
        for bike in bikes:
            current_station = choice(stations)
            start_time = datetime.now()
            for _ in range(randint(1, journeys + 1)):
                end_time = start_time + timedelta(
                    hours=randint(0, max_hours - 1),
                    minutes=randint(0, 60)
                )
                wr.write("%s,%s,%s,%s\n" % (
                    current_station, bike,
                    start_time.strftime("%Y%m%dT%H:%M:%S"),
                    end_time.strftime("%Y%m%dT%H:%M:%S")
                ))
                start_time = end_time + timedelta(
                    hours=randint(0, max_hours - 1),
                    minutes=randint(0, 60)
                )
                current_station = choice(stations)
    print "Generated data and stored it in %s." % output


def get_mean_journey_time(filename):
    """
    :str : filename (input file)
    """
    bike_data = pd.read_csv(
        filename,
        sep=",",
        names=['station_id', 'bike_id', 'arrival', 'departure'],
        parse_dates=[2, 3]
    )

    # Sort bike data and store it in a dataframe (bds = bike data sorted)
    bds = bike_data.sort_index(by=['bike_id', 'arrival', 'departure'])

    # Append columns "arrival" and "bike_id" but shifted
    # upwards by one row, so that departure and next arrival align
    bds[["next_arrival", "next_bike_id"]] = bds[["arrival", "bike_id"]].shift(-1)

    # Append another colum (bool) which is True if the next row's data
    # is for the same bike_id
    bds["bike_ids_match"] = bds.bike_id == bds.next_bike_id

    # Calculate journey time between departure and next_arrival
    bds["journey_time"] = bds.next_arrival - bds.departure

    # Only take the complete journeys where departure time
    # and next arrival time are both present and the bike ids match
    complete_journeys = bds[bds.bike_ids_match]

    # Print the mean journey time
    mean_journey = complete_journeys.journey_time.mean()
    if mean_journey in [pd.NaT, pd.np.NaN]:
        print "No complete bike journeys found in the dataset."
    else:
        mean_journey_duration = re.search(r'\d{2}:\d{2}:\d{2}', str(mean_journey))
        if not mean_journey_duration:
            print "Mean journey time (hh:mm:ss) is %s:%s:%s." %\
                mean_journey.components[1:4]
        else:
            print "Mean journey time (hh:mm:ss) is %s." %\
                mean_journey_duration.group()


if __name__ == '__main__':
    # -------------------------------------------------------------------------
    # For testing purposes
    # -------------------------------------------------------------------------
    # test_filename = "test_data.csv"
    # generate_test_data(50, 10, 5, 5, test_filename)

    # Get mean journey time
    inputfile = "test_data.csv"
    get_mean_journey_time(inputfile)
