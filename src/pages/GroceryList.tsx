import './GroceryList.css';
import { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonCheckbox, IonInput, IonButton } from '@ionic/react';

interface GroceryItem {
  id: number;
  name: string;
  bought: boolean;
}

const GroceryList: React.FC = () => {
  const [groceries, setGroceries] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (!newItem.trim()) return;

    setGroceries([...groceries, { id: Date.now(), name: newItem, bought: false }]);
    setNewItem('');
  };

  const toggleItem = (id: number) => {
    setGroceries(groceries.map(item => item.id === id ? { ...item, bought: !item.bought } : item));
  };

  const clearBoughtItems = () => {
    setGroceries(groceries.filter(item => !item.bought));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="grocery-toolbar">
          <IonTitle>Grocery List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="grocery-container">
        <IonInput
          className="grocery-input"
          placeholder="Enter grocery item"
          value={newItem}
          onIonChange={e => setNewItem(e.detail.value!)}
        />
        <IonButton className="grocery-button" expand="block" onClick={addItem}>Add Item</IonButton>

        <IonList className="grocery-list">
          {groceries.map(item => (
            <IonItem key={item.id} className="grocery-item">
              <IonCheckbox className="grocery-checkbox" checked={item.bought} onIonChange={() => toggleItem(item.id)} />
              <IonLabel>{item.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonButton className="clear-btn" expand="block" color="danger" onClick={clearBoughtItems}>Clear Bought Items</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default GroceryList;