import './Profile.css';

const Profile = () => {
    return (
        <section className="post">
            <h2 className="profile-username">Username</h2>
            <div className="profile">
                <img className="profile-picture" src="imgs/profile.png" alt="profile picture"/>
                <div className="profile-info">
                    <h3>Age: 18</h3>
                    <h3>Gender: Male</h3>
                    <h3>City: Burgas</h3>
                    <h3>Total Posts: 3</h3>
                </div>
            </div>
            <button className="post-btn edit-profile">Edit Profile</button>
        </section>
    );
};

export default Profile;