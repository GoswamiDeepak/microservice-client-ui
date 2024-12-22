'use client'
import React from 'react';
import ToppingCard, { Topping } from './topping-card';

const topping = [
      {
            id: 1,
            name: 'Chicken',
            image: '/pizza.png',
            price: 50,
            isAvailable: true,
      },
      {
            id: 2,
            name: 'Jelapeno',
            image: '/pizza.png',
            price: 50,
            isAvailable: true,
      },
      {
            id: 3,
            name: 'Chesse',
            image: '/pizza.png',
            price: 50,
            isAvailable: true,
      },
];

const ToppingList = () => {
      const [selectedToppings, setSelectedToppings] = React.useState([
            topping[0],
      ]);

      const handleCheckBox = (topping: Topping) => {
            const isAlreadyExist = selectedToppings.some(
                  (element) => element.id === topping.id
            );
            if (isAlreadyExist) {
                  setSelectedToppings((prev) =>
                        prev.filter((elm) => elm.id !== topping.id)
                  );
                  return;
            }
            setSelectedToppings((prev) => [...prev, topping]);
      };
      return (
            <section className="mt-6">
                  <h3>Extra Topping</h3>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                        {topping.map((topping) => {
                              return (
                                    <ToppingCard
                                          topping={topping}
                                          key={topping.id}
                                          selectedToppings={selectedToppings}
                                          onHandleCheckBox={handleCheckBox}
                                    />
                              );
                        })}
                  </div>
            </section>
      );
};

export default ToppingList;
