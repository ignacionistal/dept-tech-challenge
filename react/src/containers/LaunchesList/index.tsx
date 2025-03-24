import { useEffect, useContext, useState } from "react";
import { ModeContext } from "contexts/ModeContext";
import { Launch } from "types";
import { LaunchCard, Search, Pagination, CARDS_PER_PAGE } from "components";
import { getLaunches } from "../../api";
import "./index.scss";

export const LaunchesList = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [filteredLaunches, setFilteredLaunches] = useState<Launch[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const { showAll } = useContext(ModeContext);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filterLaunches = (): void => {
    setCurrentPage(1);
    return setFilteredLaunches(
      launches.filter((launch: Launch) => {
        const matchesLaunchSearch = launch.mission_name.toLowerCase().includes(searchText.toLowerCase());
        const matchesFavoriteStatus = showAll || launch.favorite;
        return matchesLaunchSearch && matchesFavoriteStatus;
      })
    );
  };

  const updateLaunchFavorite = (flight_number: number): void => {
    const updatedLaunches = launches.map((launch: Launch) => {
      if(launch.flight_number === flight_number) {
        return {...launch, favorite: !launch.favorite};
      }
      return launch;
    });
    setLaunches(updatedLaunches);
  }

  const loadLaunches = async (): Promise<void> => {
    try {
      const launches: Launch[] = await getLaunches();
      setLaunches(launches);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadLaunches();
  }, []);

  useEffect(filterLaunches, [searchText, showAll, launches]);

  return (
    <div className="launches-list-container">
      <Search 
        value={searchText} 
        onChange={setSearchText}
        placeholder="Search all launches..."
      />
      <div className="launches-list">
        {filteredLaunches
          .filter(
            (_: Launch, i: number) =>
              i >= CARDS_PER_PAGE * (currentPage - 1) &&
              i < CARDS_PER_PAGE * currentPage
          )
          .map((launch, i) => (
            <LaunchCard
              key={launch.flight_number}
              launch={launch}
              updateFavorite={updateLaunchFavorite}
            />
          ))}
      </div>
      <Pagination
        value={currentPage}
        onChange={setCurrentPage}
        itemsCount={filteredLaunches.length}
      />
    </div>
  );
};
