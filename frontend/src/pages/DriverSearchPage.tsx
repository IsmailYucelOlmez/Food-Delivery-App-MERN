import { useSearchDrivers } from "@/api/DriverApi";
import LicenceFilter from "../components/driversearchpage/LicenceFilter";
import PaginationSelector from "../components/searchpage/PaginationSelector";
import SearchBar, { SearchForm } from "../components/SearchBar";
import { useState } from "react";
import DriverResultCard from "@/components/driversearchpage/DriverResultCard";


export type DriverSearchState = {
  searchQuery: string;
  page: number;
  licence_type: string[];
  experience_years: number;
  have_vehicle_type: string[];
};

const DriverSearchPage = () => {

  const [searchState, setSearchState] = useState<DriverSearchState>({ searchQuery: "", page: 1, licence_type: [],have_vehicle_type:[],experience_years:-1});

  const { results, isLoading } = useSearchDrivers(searchState);

  const setSelectedLicences = (selectedLicences: string[]) => { setSearchState((prevState) => ({ ...prevState, licence_type:selectedLicences, page: 1, }));};

  const setPage = (page: number) => { setSearchState((prevState) => ({ ...prevState, page, })); };

  const setSearchQuery = (searchFormData: SearchForm) => { setSearchState((prevState) => ({ ...prevState, searchQuery: searchFormData.searchQuery, page: 1, })); };


  if (isLoading) {
    <span>Loading ...</span>;
  }

  if (!results?.data) {
    return <span>No results found</span>;
  }

  return (
    <div className="lg:w-9/10 mx-auto grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">

      <div id="cuisines-list">

        <LicenceFilter selectedLicences={searchState.licence_type} onChange={setSelectedLicences} />
      </div>

      <div id="main-content" className="flex flex-col gap-5">

        <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeHolder="Search by Location"/>

        {results.data.map((driver,i) => (

          <DriverResultCard key={i} driver={driver} />
          
        ))}

        <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />

      </div>
    </div>
  );
};

export default DriverSearchPage;
