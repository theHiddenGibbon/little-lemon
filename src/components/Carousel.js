import './Carousel.css';
import SpecialsCard from './SpecialsCard.js';

const specialsData = [
  {
    title: "Bruschetta",
    description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    price: "$7.99",
    image: "../../dynamic-images/bruschetta.jpg"
  },
  {
    title: "Greek Salad",
    description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    price: "$15.99",
    image: "../../dynamic-images/greek-salad.jpg"
  },
  {
    title: "Lemon Dessert",
    description: "This comes straight from Grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    price: "$5.99",
    image: "../../dynamic-images/lemon-dessert.jpg"
  },
  {
    title: "Pasta",
    description: "Lorem ipsum elit eu irure veniam aliquip velit aliqua sunt ullamco sint pariatur do. Do aliqua cillum reprehenderit sunt eu incididunt ad nisi in commodo aliquip.",
    price: "$12.99",
    image: "../../dynamic-images/pasta.jpg"
  },
  {
    title: "Grilled Fish",
    description: "Lorem ipsum Minim velit magna occaecat excepteur. In laboris eu aliqua ut cupidatat. Deserunt commodo sunt sint excepteur ut fugiat. Dolore dolore ex ipsum deserunt.",
    price: "$15.99",
    image: "../../dynamic-images/grilled-fish.jpg"
  }
];

const Carousel = () => {
  return(
    <ul className="carousel">
      {specialsData.map((item, index) => (
        <SpecialsCard 
        key={index} 
        title={item.title} 
        description={item.description} 
        price={item.price} 
        image={item.image} 
        />
      ))}
    </ul>
  );
};
export default Carousel;