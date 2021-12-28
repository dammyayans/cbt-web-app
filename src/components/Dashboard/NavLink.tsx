import classNames from 'classnames';
import React from 'react';
import {Link} from 'react-router-dom';

interface Props {
  to: string;
  children: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

const NavLink = ({children, to, icon, isActive = false}: Props) => {
  return (
    <Link
      to={to}
      className={classNames('nav-link', {
        'is-active': isActive,
      })}>
      <div>{icon}</div>
      <div className="nav-link__text">{children}</div>
    </Link>
  );
};

export default NavLink;
