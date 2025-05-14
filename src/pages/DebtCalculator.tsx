import './DebtCalculator.css';
import { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';

const DebtCalculator: React.FC = () => {
  const [debt, setDebt] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [payoffMonths, setPayoffMonths] = useState<number | null>(null);

  const calculatePayoff = () => {
    if (debt <= 0 || monthlyPayment <= 0) return;

    const monthlyInterest = (debt * (interestRate / 100)) / 12;
    const totalDebt = debt + monthlyInterest * (debt / monthlyPayment);
    const months = Math.ceil(totalDebt / monthlyPayment);

    setPayoffMonths(months);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Debt Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="debt-calculator">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Debt Amount ($)</IonLabel>
            <IonInput type="number" value={debt} onIonChange={e => setDebt(parseFloat(e.detail.value!))} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Interest Rate (%)</IonLabel>
            <IonInput type="number" value={interestRate} onIonChange={e => setInterestRate(parseFloat(e.detail.value!))} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Monthly Payment ($)</IonLabel>
            <IonInput type="number" value={monthlyPayment} onIonChange={e => setMonthlyPayment(parseFloat(e.detail.value!))} />
          </IonItem>
          <IonButton expand="block" onClick={calculatePayoff}>Calculate</IonButton>
        </IonList>

        {payoffMonths !== null && (
          <IonItem className="debt-result">
            <IonLabel>Estimated Debt-Free in {payoffMonths} months</IonLabel>
          </IonItem>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DebtCalculator;