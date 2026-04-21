import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Layout } from './components/Layout';

// Register GSAP plugins once at app root
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Lazy-load all pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Approach = lazy(() => import('./pages/Approach'));
const Services = lazy(() => import('./pages/Services'));
const Cases = lazy(() => import('./pages/Cases'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contacts = lazy(() => import('./pages/Contacts'));

export default function App() {
  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="approach" element={<Approach />} />
            <Route path="services" element={<Services />} />
            <Route path="cases" element={<Cases />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="contacts" element={<Contacts />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
