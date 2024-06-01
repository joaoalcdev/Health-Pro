const avatar = [
  {
    id: 1,
    name: 'Male',
    image: '/images/male.jpg',
  },
  {
    id: 2,
    name: 'Female',
    image: '/images/female.jpg',
  },
  {
    id: 3,
    name: 'Other',
    image: '/images/other.jpg',
  },
  {
    id: 4,
    name: 'Prefiro não dizer',
    image: '/images/other.jpg',
  },
];

export default function getAvatar(id) {
  if (!id) return avatar[0].image;
  const index = avatar.findIndex((item) => item.id === id);
  return avatar[index].image;
}