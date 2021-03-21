import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const MakeOrderRu = () => (
  <>
    <ul style={{ margin: 0 }}>
      <li>Войти и зарегистрироваться.</li>
      <li>Добавить товар в корзину.</li>
      <li>Перейти в корзину.</li>
      <li>Проверить заказ.</li>
      <li>Нажать оформить заказ.</li>
      <li>Заполнить адрес доставки.</li>
      <li>Выбрать способ оплаты.</li>
      <li>
        В зависимости от выбранного способа либо оплатить на сайте либо оформить
        заказ и оплатить иным способом.
      </li>
    </ul>
  </>
);

const MakeOrderEng = () => (
  <>
    <ul style={{ margin: 0 }}>
      <li>Log in and register.</li>
      <li>Add item to cart.</li>
      <li>Go to cart.</li>
      <li>Check the order.</li>
      <li>Click to checkout button.</li>
      <li>Fill in the shipping address.</li>
      <li>Choose a payment method.</li>
      <li>
        Depending on the method chosen, either pay on the website or place an
        order and pay another way.
      </li>
    </ul>
  </>
);

const HowToPayRu = () => (
  <>
    <p>
      Понравившиеся товары Вы можете оплатить перечисленными ниже способами.
    </p>
    <p>Если вы находитесь на территории Российской Федерации:</p>
    <ul style={{ margin: 0 }}>
      <li>банковской картой;</li>
      <li>
        наличными при доставке курьером (доставка курьером возможна только в
        Москве в пределах МКАД, стоимость доставки курьером 400 рублей;
      </li>
      <li>
        возможны иные способы (пишите ваши пожелания в комментарии к заказу).
      </li>
    </ul>
    <p>
      Если вы находитесь за пределами территории Российской Федерации - оплата
      через платежную систему PayPal (данные для оплаты будут высланы в письме
      после оформления заказа.
    </p>
  </>
);

const HowToPayEng = () => (
  <>
    <p>You can pay for the goods you like as follows.</p>
    <p>If you are in Russia:</p>
    <ul style={{ margin: 0 }}>
      <li>by credit card;</li>
      <li>
        in cash upon delivery by courier (delivery by courier is possible in
        Moscow within the Moscow Automobile Ring Road), the cost of delivery by
        courier is 400 rubles
      </li>
      <li> other methods are possible (write in the comments to the order)</li>
    </ul>
    <p>
      If you are from outside the Russia - payment through PayPal (payment data
      will be sent in a letter after placing an order)
    </p>
  </>
);

const ShippingRu = () => (
  <>
    <ul style={{ margin: 0 }}>
      <li>
        Доставка осуществляется по России и за рубеж Почтой России (стоимость
        данной доставки учтена в итоговой стоимости заказа)
      </li>
      <li>
        В Москве (в пределах МКАД) возможна доставка курьером, стоимость
        доставки курьером составлет дополнительно 400 рублей
      </li>
    </ul>
  </>
);

const ShippingEng = () => (
  <>
    <ul style={{ margin: 0 }}>
      <li>
        Delivery is carried out in Russia and abroad by Russian Post (the cost
        of this delivery is taken into account in the final cost of the order)
      </li>
      <li>
        In Moscow (within the Moscow Automobile Ring Road) delivery by courier
        is possible, the cost of delivery by courier will be an additional 400
        rubles
      </li>
    </ul>
  </>
);

const ContactsRu = () => (
  <>
    <ul style={{ margin: 0 }}>
      <li>Индивидуальный предприниматель Клишевич Максим Александрович</li>
      <li>ИНН 246305425708</li>
      <li>ОГРНИП 317774600133510</li>
      <li>Наименование банка ПАО Сбербанк</li>
      <li>корреспондентский счет 30101810400000000225</li>
      <li>БИК 044525225</li>
      <li>расчетный счет 40802810838000054879</li>
    </ul>
    Обращаем внимание, что данные реквизиты не предназначены для оплаты заказов
  </>
);

const ContactsEng = () => (
  <>
    <ul style={{ margin: 0 }}>
      <li>Maxim Klishevich</li>
      <li>phone: +7-999-999-99-99</li>
      <li>E-mail: info@klishevich.com</li>
    </ul>
  </>
);

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { t } = useTranslation();

  const language = useSelector((state) => state.langR);

  return (
    <div>
      <Accordion
        square
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant="h6" component={'span'}>
            {t('make_order')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'}>
            {language === 'en' ? <MakeOrderEng /> : <MakeOrderRu />}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        square
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography variant="h6" component={'span'}>
            {t('how_to_pay')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'}>
            {language === 'en' ? <HowToPayEng /> : <HowToPayRu />}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        square
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography variant="h6" component={'span'}>
            {t('shipping')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'}>
            {language === 'en' ? <ShippingEng /> : <ShippingRu />}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        square
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography variant="h6" component={'span'}>
            {t('contacts')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'}>
            {language === 'en' ? <ContactsEng /> : <ContactsRu />}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
