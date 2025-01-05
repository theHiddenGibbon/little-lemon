import './SpecialsCard.css';
import { Link } from 'react-router-dom';
import PlusIcon from '../icons/circle-plus-solid.svg';

const SpecialsCard = (props) => {
  return(
    <li className="specials">
      <div className="img-container">
        <img src={`${props.image}`} alt={props.title} />
      </div>
      <h5>{props.title}</h5>
      <span className="highlight-text">{props.price}</span>
      <p>{props.description}</p>

      <div className="add-to-order">
        <span className="highlight">Add to order</span>
        <Link to="/order" aria-label={`Add ${props.title} to order`}>
          <img src={PlusIcon} alt="+" />
        </Link>
      </div>
    </li>
  );
};
export default SpecialsCard;