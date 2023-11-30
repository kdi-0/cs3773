import React from 'react';
import Advertisement from './Advertisement';

const FeaturedProducts = () => {
  const petToys = ['/Pet Toy.jpeg', '/PetToy2.jpeg'];
  const petFood = ['/PetFood1.jpeg', '/CatFood2.jpeg'];
  const petTraining = ['/PetTraining1.jpeg', '/PetTraining2.jpeg'];
  return (
    <div className="mt-10 text-center">
      <h2 className="font-bold text-4xl mb-8">Featured Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <Advertisement category="Pet Food" images={petFood} />
        </div>

        <div>
          <Advertisement category="Pet Toys" images={petToys} />
        </div>

        <div>
          <Advertisement category="Pet Training" images={petTraining} />
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
