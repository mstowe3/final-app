import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {  cashSharp, heartOutline, heartSharp, calculatorOutline, calculatorSharp, cashOutline, globeOutline, globeSharp, carOutline, carSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Currency Converter',
    url: '/folder/Currency Converter',
    iosIcon: cashOutline,
    mdIcon: cashSharp
  },
  {
    title: 'Debt Payoff Calculator',
    url: '/folder/Debt Calculator',
    iosIcon: calculatorOutline,
    mdIcon: calculatorSharp
  },
  {
    title: 'Grocery List',
    url: '/folder/Grocery List',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Weather Forecast',
    url: '/folder/Weather Forecast',
    iosIcon: globeOutline,
    mdIcon: globeSharp
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent className="menu-container">
        <IonList id="inbox-list">
          <IonListHeader className="menu-header">Menu</IonListHeader>

          {appPages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem className={`menu-item ${location.pathname === appPage.url ? 'selected' : ''}`} 
                       routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                <IonIcon className="menu-icon" aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
