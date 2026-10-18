import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PRINCIPAL_PHOTO } from '../mediaPaths'
import principalData from '../data/principal.json'

export default function Principal() {
  const {
    name = 'Dr. Asha Sukumaran',
    photo = PRINCIPAL_PHOTO,
    homepageQuote = 'Government Polytechnic College, Kannur has been at the forefront of technical education in northern Kerala since its inception.'
  } = principalData || {}

  return (
    <section className="section principal" id="principal">
      <div className="container">
        <div className="principal__card" data-animate="fade-up">
          <div className="principal__avatar">
            <img
              src={photo || PRINCIPAL_PHOTO}
              alt={`${name} - Principal`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          </div>
          <div className="principal__info">
            <span className="section__label">From the Desk of</span>
            <h3 className="principal__name">{name}</h3>
            <p className="principal__message">
              "{homepageQuote}"
            </p>
            <p className="principal__closing">
              — Principal, GPTC Kannur
            </p>
            <Link to="/principal" className="btn btn--outline btn--sm principal__read-more">
              Read Full Message <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
