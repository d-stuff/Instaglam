import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import HomeIcon from 'components/Icons/HomeIcon/HomeIcon';
import ChatIcon from 'components/Icons/ChatIcon/ChatIcon';
import ExploreIcon from 'components/Icons/ExploreIcon/ExploreIcon';
import HeartIcon from 'components/Icons/HeartIcon/HeartIcon';
import ProfilePic from 'components/ProfilePic/ProfilePic';
import MobileSearchIcon from 'components/Icons/MobileSearchIcon/MobileSearchIcon';
import CustomNavLink from 'components/Navbar/CustomNavLink/CustomNavLink';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import styles from './NavLinks.module.scss';

const NavLinks = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <div className={styles.NavLinks}>
      <CustomNavLink to="/">
        <HomeIcon />
      </CustomNavLink>
      <MobileSearchIcon />
      <CustomNavLink to="/direct/inbox" className={styles.chatLink}>
        <ChatIcon className={styles.ChatIcon} />
      </CustomNavLink>
      <CustomNavLink to="/explore">
        <ExploreIcon />
      </CustomNavLink>
      <HeartIcon className={styles.HeartIcon} />
      <NavLink
        exact
        to={!loading && `/${user.username}`}
        className={styles.profilePicLink}
        activeClassName={styles.activeProfilePic}
      >
        {loading ? <LoadingSpinner className={styles.ProfilePic} /> : (
          <ProfilePic
            url={user.profilePic}
            className={styles.ProfilePic}
          />
        ) }
      </NavLink>
    </div>
  );
};

export default NavLinks;
