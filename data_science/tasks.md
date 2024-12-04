# Discussion Points for Data Science task

## Task 1 
Open data frame, convert unix ms column to date time and plot results.

* **Read Data:** Use read_csv (read_excel didn't seem to identify duplicates)

* **Data Cleaning:** Dropped unused columns and duplicates - there were quite a lot!

* **Converting Time:** Converting unix ms time to date time, and renaming column

* **Serial numbers:** Separate data frame by the 2 serial number (there are only 2 values, 227 and 30).

* **Plotting results:**
Instruction was to plot columns as a function of time. The dataset for each serial number is over 100 thousand data points. Plotting all on one graph is too cumbersome and isn't useful for visualisation. I have therefore opted for taking a slice of the data frame (only about 1000 data points and plotting the results for that.)

## Task 2: Regression models

The instructions are to create two different regression models to predict the values for the power, voltage and current based on values for delta_t_ms, on-off and cg_temperature. And evaluate the models.

**Data exploration**
It seems like the each of the data is in spikes. There seems to be quite a good correlation between on-off and the high-low values for the 

**Data pre-processing**
I decided to represent the data to predict as binary data: off or on (0 or 1) depending on if the value is high or low. 

I created a `to_on_off` lambda function to transform each of the target columns (power, voltage, current) into binary. I got the mean for each of those columns, and assigned 0 if value was below mean, and 1 if value was above mean. Mean may not be the best value to use as a compartivie in this case, but in the interest of time, it seems suitable for the puproses of demonstration.

I then decided to predict if the value would be on, or off. 

I tried linear regression, and logistic regression (suitable for predicting binary classes)

**Training and Testing dataset**

I used the sklearn `train_test_split` helper to separate the dataset into 70% training and 30% testing data.

I also made two training passes for each model: 
* One using all the input variables: `delta_t_ms`, `on-off` and `cg_temperature_cel`.
* The second one using only values for `on-off` 

I could also have created models for each of combinations (e.g. `on-off` and `cg_temperature_cel`, `delta_t_ms` and `on-off` etc) but in the interest of time and for demo-ing purposes, I stuck with two results, for each model.

### Linear Regression Model

**Model used**: Sklearn `LinearRegression` model, building a separate model for power, voltage and current that we are trying to predict.


In a linear regression model, there are several metrics that can be used to determine how well a model has performed. These are based on the deviation between predictions testing values.

Some examples of metrics that can be used:
* R-square or Coefficient Determination: represents proportion of variance for a dependant variable, explained by independant variable. 
* Mean Squarred Error (MSE): measure of average of square of the errors
* Mean Absolute Error (MAE): measured error between paired observations - arithmetic average of absolute errors.
* Standard Deviation: amount of variation or dispersion of the values.

And a few more statistical techniques based on the error detection between predicted and actual.

I've selected R2, MAE, and MSE for evaluating linear model. Choice of one of those would be enough to get an initial idea of how well the model is performing.

**Results for training data containing `delta_t_ms`, `on-off` and `cg_temperature_cel`**

<center>

|       |   Power   | Voltage | Current |
|-------| :-------: | ----    | --- |
|MAE |0.11565  | 0.00906 | 0.01065 |
|MSE |0.05658  | 0.00450 | 0.00582 |
|R2  |0.77256  | 0.98117 | 0.97576 |
</center>

**Results for training data containing only `on-off`**
<center>


|       |   Power   | Voltage | Current |
|-------| :-------: | ----    | --- |
|MAE |0.11516  | 0.00906 | 0.01007 |
|MSE |0.05826  | 0.00443 | 0.00469 |
|R2  |0.76563  | 0.98150 | 0.98060 |
</center>

For voltage and current predictions, only using on-off seems the yield slightly better results. For power, however, the MAE improves slightly, but the MSE and R2 scores are slightly worse.

Linear regression is the most straighforward regression model and I therefore wanted to try it out on this dataset. Considering the dataset is represented by binary on/off values though, I didn't expect it to work so well.

### Logisitcal Regression Model Results

**Model used**: Sklearn `LogisticRegression` model, building a separate model for power, voltage and current that we are trying to predict.

Logistic regression is used for classification and should therefore be relatively well suited to this task.

There are a number of metrics that can be used to calculate the accuracy of a model using logistic regression.
* Confusion matrix: a tabular summary of True/False and Positive/Negative prediciton rates.
* Accuracy score: number of correct predictions / number of predictions.
* Precision: Number of true positives / total number of postivie predictions. Useful when the classes are very imbalanced.
* Recall / Sensitivity: Number of true positives / (nuber of trie positives + number of false negatives). The higher this score, the better the model is at identifying positives.
* Specificity: model ability to correctly predict negatives.
* F1 score: Combine precision and recall and its harmonic mean. Useful for data imbalance.
* Receiver Operating Characteristic (ROC) curve: used to obtain optimal probablity threshold to improve predictive capability of a machine learning model.

I have used sklearn's confusion metric and classification report, which contain details of accuracy, precision, recall and f1 score. I have also included MSE (same as MAE in this case) for comparison with previous model.

**Results for training data containing `delta_t_ms`, `on-off` and `cg_temperature_cel`**

<center>

*Power*
|MSE    | Accuracy |
|-------| :-------:| 
|0.06332| 0.94     | 


![power matrix](plots/cnf_matrix_power_all.png)
![power report](plots/class_power_all.png)


*Voltage*
|MSE    | Accuracy |
|-------| :-------:| 
|00.0046| 1.00     | 


![voltage matrix](plots/cnf_matrix_voltage_all.png)
![voltage report](plots/class_voltage_all.png)


*Current*
|MSE    | Accuracy |
|-------| :-------:| 
|0.00590| 0.99     | 


![current matrix](plots/cnf_matrix_current_all.png)
![current report](plots/class_current_all.png)
</center>

**Results for training data containing only `on-off`**


<center>

*Power*
|MSE    | Accuracy |
|-------| :-------:| 
|0.06534| 0.93     | 



![power matrix](plots/cnf_matrix_power_on-off.png)

![power report](plots/class_power_on-off.png)


*Voltage*
|MSE    | Accuracy |
|-------| :-------:| 
|00.00445| 0.996     | 



![voltage matrix](plots/cnf_matrix_voltage_on-off.png)
![voltage report](plots/class_voltage_on-off.png)


*Current*
|MSE    | Accuracy |
|-------| :-------:| 
|0.004711| 0.995s    | 


![current matrix](plots/cnf_matrix_current_on-off.png)
![current report](plots/class_current_on-off.png)
</center>


## Task 3: Time Forecasting

Instructions:
*Make a model that predicts the future values of `active_power_w` based on the past values of `active_power_w`.*

My understanding is to use the `date` and `active_power_w` to feed into a time forecasting model.

However, there seems to be over 100 data points for each time slot. This doesn't seem suited to a time-forecasting task. An additional discussion about the dataset would be needed.