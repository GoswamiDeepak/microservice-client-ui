
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import CheckoutForm from './components/CheckoutForm';

const CheckoutPage = async ({ searchParams }: { searchParams: { restaurentId: string } }) => {
    const session = await getSession();

    const sParams = new URLSearchParams(searchParams);
    const existingQueryString = sParams.toString();

    sParams.set('return-to', `/checkout?${existingQueryString}`);

    if (!session) {
        redirect(`/login?${sParams}`);
    }

    return <CheckoutForm />;
};

export default CheckoutPage;
