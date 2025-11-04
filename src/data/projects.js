import otw from '../assets/docs/otw-tourism.png'
import bags from '../assets/docs/voyageur-bags.png'
import paws from '../assets/docs/pawsitive-care.jpeg'

export const projects = [
  {
    id: 'otw-tourism',
    title: 'OTW Tourism Website',
    summary: 'Tourism package website using HTML, CSS, JS, PHP, and MySQL.',
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    repo: 'https://github.com/J-Dattani/OTW_Toursim_Website',
    live: null,
    cover: otw
  },
  {
    id: 'voyageur-bags',
    title: 'Voyageur Bags E‑Commerce',
    summary: 'Bag shopping site with product listings, cart, and checkout flow using PHP and MySQL.',
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    repo: 'https://github.com/J-Dattani/Voyageur-Bags',
    live: null,
    cover: bags
  },
  {
    id: 'pawsitive-care',
    title: 'Pawsitive Care',
    summary: 'Dog health & wellness tracker built with HTML, CSS, JS, and JSON. Deployed on Vercel.',
    stack: ['HTML', 'CSS', 'JavaScript', 'JSON'],
    repo: 'https://github.com/J-Dattani/Pawsitive_Care',
    live: 'https://pawsitive-care.vercel.app/',
    cover: paws
  }
]
