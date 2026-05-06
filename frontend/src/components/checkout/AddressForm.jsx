import Input from '@/components/ui/Input';

export default function AddressForm({ register, errors = {} }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      <Input label="Full Name" {...register('name')} error={errors.name?.message} />
      <Input label="Phone (M-Pesa)" {...register('phone')} placeholder="07XXXXXXXX" error={errors.phone?.message} />
      <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
      <Input label="City" {...register('city')} error={errors.city?.message} />
      <div className="sm:col-span-2">
        <Input label="Street Address" {...register('address')} error={errors.address?.message} />
      </div>
      <div className="sm:col-span-2">
        <Input label="Notes (optional)" {...register('notes')} />
      </div>
    </div>
  );
}
