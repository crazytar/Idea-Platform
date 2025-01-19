import { AppContext } from '@/components/providers';
import React, { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, CheckoutSchemaT } from '@/lib/checkout-schema';
import { Container } from '@/components/ui/container';
import { Title } from '@/components/ui/title';
import { WhiteBlock } from '@/components/ui/white-block';
import { FormInput } from '@/components/ui/form-input';
import { CheckoutItemDetails } from '@/components/ui/checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button } from '@/components/ui/shadcn/button';
import { TicketCart } from '@/components/ui/ticket-cart';
import toast from 'react-hot-toast';
interface CheckoutProps {
    className?: string;
}

const Checkout: FC<CheckoutProps> = ({ className }) => {
    const { ticket } = React.useContext(AppContext);
    const defaultValues = {} as CheckoutSchemaT;



    const form = useForm<CheckoutSchemaT>({
        resolver: zodResolver(checkoutSchema), //TODO use server side validation  with Server Actions
        defaultValues,
    });
    if (!ticket) return null;
    // const onSubmit = async (data: CheckoutSchemaT) => {
    async function onSubmit(data: CheckoutSchemaT) {
        toast.success('Заказ успешно оформлен', {
            duration: 3000,
            position: 'top-center',
        });
        setTimeout(() => {
            window.location.href = '/';
        }, 3000)

    }
    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" size="xl" />
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap gap-4 sm:gap-10">
                        {/* Левая часть */}
                        <div className="flex flex-col gap-4 sm:gap-10  flex-1">
                            <WhiteBlock title="Детали перелёта" className="flex-1">
                                <TicketCart ticket={ticket} currency="RUB" withButton={false} />
                            </WhiteBlock>
                            <WhiteBlock title="Персональные данные" className=" flex-1">
                                <div className="grid grid-cols-2 gap-4" >
                                    <FormInput name="firstName" placeholder="Имя" />
                                    <FormInput name="lastName" placeholder="Фамилия" />
                                    <FormInput name="email" placeholder="Email" />
                                    <FormInput name="phone" placeholder="Телефон" required={true} />
                                    <FormInput name="passport" placeholder="Номер пасспорта" required={true} />
                                </div>
                            </WhiteBlock>
                        </div>
                        {/* Правая часть */}
                        <div className="w-full lg:max-w-[450px]">
                            <WhiteBlock className='p-6 top-4'>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xl">Итого:</span>
                                    <span className="text-4xl font-extrabold">{`${(ticket.price) + 6000} ₽`}</span>
                                </div>
                                <CheckoutItemDetails
                                    title={
                                        <div className="flex items-center">
                                            <Package size={18} className="mr-2 text-gray-400" />
                                            Стоимость билета:
                                        </div>
                                    }
                                    value={`${ticket.price} ₽`}
                                />
                                <CheckoutItemDetails
                                    title={
                                        <div className="flex items-center">
                                            <Truck size={18} className="mr-2 text-gray-400" />
                                            Топливный сбор:
                                        </div>
                                    }
                                    value={5000 + ' ₽'}
                                />
                                <CheckoutItemDetails
                                    title={
                                        <div className="flex items-center">
                                            <Percent size={18} className="mr-2 text-gray-400" />
                                            Дополнительные услуги:
                                        </div>
                                    }
                                    value={1000 + ' ₽'}
                                />
                                <Button
                                    // loading={loading}
                                    type="submit"
                                    className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                                    Оформить заказ
                                    <ArrowRight className="w-5 ml-2" />
                                </Button>
                            </WhiteBlock>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}
export default Checkout;
