import Rating from '@/components/ui/Rating';

const data = [
  { name: 'Wanjiku Mwangi', text: 'Got my Samsung remote in 2 hours. Worked perfectly out of the box. Very professional team.' },
  { name: 'Brian Otieno', text: 'Bought a universal remote for my old TV — works like new. Plus the covers are excellent quality.' },
  { name: 'Faith Achieng', text: 'Best customer service. They walked me through pairing my LG Magic remote on WhatsApp.' },
  { name: 'Kevin Kimani', text: 'Fast M-Pesa checkout, real product, real warranty. Highly recommend.' },
  { name: 'Mercy Njeri', text: 'Affordable and authentic. The Fire TV remote replacement saved my movie nights!' },
];

export default function Testimonials() {
  return (
    <section className="container-page py-12">
      <h2 className="text-3xl font-bold mb-6">What customers say</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((t) => (
          <div key={t.name} className="glass p-5">
            <Rating value={5} />
            <p className="text-white/80 mt-3 text-sm">"{t.text}"</p>
            <div className="mt-4 text-sm font-semibold">{t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
