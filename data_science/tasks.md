# Discussion Points for Data Science task

## Task 1 
Open data frame and plot restuls.

**Read Data:**
Use read_csv (read_excel didn't seem to identify duplicates)

**Data Cleaning:** Dropped unused columns and duplicates - there were quite a lot!

**Converting Time:** Converting unix ms time to date time, and renaming column

**Serial numbers:** Separate data frame by the 2 serial number (there are only 2 values, 227 and 30).

**Plotting results:**
Instruction was to plot columns as a function of time.

The dataset for each serial number is over 100 thousand data points. Plotting all on one graph is too cumbersome and isn't useful for visualisation. I have therefore opted for taking a slice of the data frame (only about 1000 data points and plotting the results for that.)

TODO: import data

## Task 2: Regression models

The instructions are to create two different regression models to predict the values for the power, voltage and current based on values for delta_t_ms, on-off and cg_temperature. And evaluate the models.

**Data exploration**
It seems like the each of the data is in spikes. There seems to be quite a good correlation between on-off and the high-low values for the 

**Data pre-processing**
I decided to represent the data to predict as binary data: off or on (0 or 1) depending on if the value is high or low. 

I created a `to_on_off` lambda function to transform each of the target columns (power, voltage, current) into binary. I got the mean for each of those columns, and assigned 0 if value was below mean, and 1 if value was above mean. Mean may not be the best value to use as a compartivie in this case, but in the interest of time, it seems suitable for the puproses of demonstration.

I then decided to predict if the value would be on, or off. 

I tried linear regression, and logistic regression (suitable for predicting binary classes)