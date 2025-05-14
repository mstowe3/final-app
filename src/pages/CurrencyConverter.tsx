import { useState, useEffect } from 'react';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import './CurrencyConverter.css';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(API_URL);
        setExchangeRate(response.data.rates[currency]);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };
    fetchExchangeRate();
  }, [currency]);

  // Convert currency
  const convertCurrency = () => {
    setConvertedAmount(amount * exchangeRate);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Currency Converter</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="converter-container">
        <IonInput
          className="converter-input"
          type="number"
          value={amount}
          placeholder="Enter amount"
          onIonChange={(e) => setAmount(Number(e.detail.value))}
        />

        <IonSelect className="converter-select" value={currency} onIonChange={(e) => setCurrency(e.detail.value)}>
          <IonSelectOption value="EUR">Euro (EUR)</IonSelectOption>
          <IonSelectOption value="GBP">British Pound (GBP)</IonSelectOption>
          <IonSelectOption value="JPY">Japanese Yen (JPY)</IonSelectOption>
        </IonSelect>

        <IonButton className="converter-button" expand="block" onClick={convertCurrency}>
          Convert
        </IonButton>

        <h2 className="converter-result">{convertedAmount.toFixed(2)} {currency}</h2>
      </IonContent>
    </IonPage>
  );
};

export default CurrencyConverter;