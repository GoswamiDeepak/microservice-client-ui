import Photos from '@/components/custom/photos';
import { Button } from '@/components/ui/button';
import { Topping } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';

type PropTypes = {
      topping: Topping;
      selectedToppings: Topping[];
      onHandleCheckBox: (topping: Topping) => void;
};

const ToppingCard = ({ topping, selectedToppings, onHandleCheckBox }: PropTypes) => {
     
      const isCurrentSelected = selectedToppings.some((element) => element._id === topping._id);
      return (
            // <Button variant={'outline'} className={`flex flex-col h-42 ${isCurrentSelected && 'border-primary'}`}>
            <Button
                  onClick={() => onHandleCheckBox(topping)}
                  variant={'outline'}
                  className={cn('flex flex-col h-42 relative', isCurrentSelected && 'border-primary')}>
                  <Photos src={topping.image} alt={topping.name} width={25} height={25} />
                  
                  <h4>{topping.name}</h4>
                  <p>&#8377;{topping.price}</p>
                  {isCurrentSelected && <CircleCheck className="absolute top-1 right-1 text-primary" />}
            </Button>
      );
};

export default ToppingCard;
