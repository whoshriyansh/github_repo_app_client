import React, { useCallback, useEffect, useState } from "react";
import Search from "../components/Search";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";
import SortRepos from "../components/SortRepos";
import toast from "react-hot-toast";
import { API_URL } from "../config";

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortType, setSortType] = useState("forks");

  const getUserProfandRep = useCallback(async (username = "whoshriyansh") => {
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/users/profile/${username}`);
      const { repos, userProfile } = await res.json();
      setUserProfile(userProfile);
      setRepos(repos);

      return { userProfile, repos };
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserProfandRep();
  }, [getUserProfandRep]);

  const onSearch = async (e, username) => {
    e.preventDefault();

    setLoading(true);
    setUserProfile(null);
    setRepos([]);

    const [userProfile, repos] = await getUserProfandRep(username);

    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
  };

  const onSort = (sortType) => {
    if (sortType === "recent") {
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortType === "forks") {
      repos.sort((a, b) => b.forks_count - a.forks_count);
    } else if (sortType === "stars") {
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    }
    setSortType(sortType);
    setRepos([...repos]);
  };

  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      {!loading && repos && repos.length > 0 && (
        <SortRepos onSort={onSort} sortType={sortType} />
      )}

      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

        {!loading && <Repos repos={repos} />}

        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default HomePage;
