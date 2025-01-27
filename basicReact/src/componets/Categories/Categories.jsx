import React from 'react';
import * as Icon from 'react-bootstrap-icons';
import './Categories.css';

const Categories = () => {
  return (
    <div className="dropdown">
      <button className="btn" type="button" data-bs-toggle="dropdown">
        <Icon.List className='me-2' /> 
        <p className='ctg-list'>Categories</p>
      </button>
      <ul className="dropdown-menu">
        <li><a className="dropdown-item" href="/clothes"><Icon.TshirtFill className='me-2' /> Clothes</a></li>
        <li><a className="dropdown-item" href="cosmetics"><Icon.PaletteFill className='me-2' /> Cosmetics</a></li> 
        <li><a className="dropdown-item" href="pharmaceuticals"><Icon.CapsulesFill className='me-2' /> Pharmaceuticals</a></li>
        <li><a className="dropdown-item" href="#"><Icon.TreeFill className='me-2' /> Wooden Articles</a></li>
        <li><a className="dropdown-item" href="#"><Icon.BoneFill className='me-2' /> Pet Foods</a></li>
        <li><a className="dropdown-item" href="#"><Icon.LaptopFill className='me-2' /> Electronics</a></li>
      </ul>
    </div>
  );
};

export default Categories;