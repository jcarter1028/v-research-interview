# Results
This  is used to 

## Results for all X

Linear Regression model
Power
Power MAE:  0.11565483777963079
Power MSE:  0.056583626992832405
R2 power 0.7725674646470252

Voltage
Voltage MAE:  0.009063982034537402
Voltage MSE:  0.004505735358911633
R2 voltage 0.9811719063014808
Current
Current MAE:  0.010653401175709315
Current MSE:  0.00582364327906012
R2 current 0.9757601776003483




Logistic Regression model
Power
Power MAE:  0.06332194263228746
Power MSE:  0.06332194263228746
Power confusion matrix:  [[ 7763  1223]
 [    0 10328]]
Accuracy score power:  0.9366780573677126
Classification report voltage:                precision    recall  f1-score   support

         off       1.00      0.86      0.93      8986
          on       0.89      1.00      0.94     10328

    accuracy                           0.94     19314
   macro avg       0.95      0.93      0.94     19314
weighted avg       0.94      0.94      0.94     19314


Voltage
Voltage MAE:  0.004556280418349384
Voltage MSE:  0.004556280418349384
Voltage confusion matrix:  [[ 7613    47]
 [   41 11613]]
Accuracy score voltage:  0.9954437195816506
Classification report voltage:                precision    recall  f1-score   support

         off       0.99      0.99      0.99      7660
          on       1.00      1.00      1.00     11654

    accuracy                           1.00     19314
   macro avg       1.00      1.00      1.00     19314
weighted avg       1.00      1.00      1.00     19314

Current
Current MAE:  0.005902454178316247
Current MSE:  0.005902454178316247
Curernt confusion matrix:  [[ 7685    65]
 [   49 11515]]
Accuracy score current:  0.9940975458216837
Classification report current:                precision    recall  f1-score   support

         off       0.99      0.99      0.99      7750
          on       0.99      1.00      1.00     11564

    accuracy                           0.99     19314
   macro avg       0.99      0.99      0.99     19314
weighted avg       0.99      0.99      0.99     19314


## Results only for on-off
Linear Regression model
Power
Power MAE:  0.1151556169299118
Power MSE:  0.058263184243050055
R2 power 0.7656335893421511

Voltage
Voltage MAE:  0.009058173288921978
Voltage MSE:  0.004433162105594184
R2 voltage 0.9814981833389511
Current
Current MAE:  0.010074781316207806
Current MSE:  0.00468992470480236
R2 current 0.9805988065795829



Logistic Regression model
Power
Power MAE:  0.06534120327223776
Power MSE:  0.06534120327223776
Power confusion matrix:  [[ 7672  1262]
 [    0 10380]]
Accuracy score power:  0.9346587967277622
Classification report voltage:                precision    recall  f1-score   support

         off       1.00      0.86      0.92      8934
          on       0.89      1.00      0.94     10380

    accuracy                           0.93     19314
   macro avg       0.95      0.93      0.93     19314
weighted avg       0.94      0.93      0.93     19314


Voltage
Voltage MAE:  0.004452728590659625
Voltage MSE:  0.004452728590659625
Voltage confusion matrix:  [[ 7639    49]
 [   37 11589]]
Accuracy score voltage:  0.9955472714093404
Classification report voltage:                precision    recall  f1-score   support

         off       1.00      0.99      0.99      7688
          on       1.00      1.00      1.00     11626

    accuracy                           1.00     19314
   macro avg       1.00      1.00      1.00     19314
weighted avg       1.00      1.00      1.00     19314

Current
Current MAE:  0.004711608159884022
Current MSE:  0.004711608159884022
Curernt confusion matrix:  [[ 7851    50]
 [   41 11372]]
Accuracy score current:  0.995288391840116
Classification report current:                precision    recall  f1-score   support

         off       0.99      0.99      0.99      7901
          on       1.00      1.00      1.00     11413

    accuracy                           1.00     19314
   macro avg       1.00      1.00      1.00     19314
weighted avg       1.00      1.00      1.00     19314