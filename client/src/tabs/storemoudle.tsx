import { useState, useEffect } from 'react';
import Frontface from "../Clientface.tsx";
import type {Plant} from "../Querytype.ts";

//we need to call our server api here.

const DUMMY_PLANT: Plant = {
  id: 1,
  commonName: "Flakeplant",
  latinName: "Flakeplantus",
  careGuide: "None, this is a fake plant",
  Lighting: "any",
  createdAt: "Date start",
  updatedAt: "Date end"
};

export default function TabsStoreMoudle() {
  const [data, setData] = useState<Plant[] | null>([DUMMY_PLANT]);
  //should be true by default, but I turned this off for testing.
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  /*
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchphotos(){
      try {

        const response = await fetch('server_api_link_here', {
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json: Plant[] = await response.json();
        setData(json);

      }catch(e :unknown) {
        if (e instanceof Error) {
          if (e.name !== 'AbortError') {
            setError(e.message);
          }
        } else {
          setError('An unexpected error occurred');
        }
      }
      finally {
        setLoading(false);
      }
    }
    fetchphotos();

    // Clean up function to abort request if component unmounts mid-flight
    return () => abortController.abort();
  }, []);*/
  if (loading)  return <div> Loading Plants...</div>;
  if (error) return <Error>Cannot load plants.</Error>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data?.map((plant) => (
          <div key={plant.id} className="border p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold">{plant.commonName}</h3>
            {plant.latinName && <p className="italic text-gray-600">{plant.latinName}</p>}
            <p className="text-sm mt-2">{plant.careGuide}</p>
          </div>
      ))}
    </div>)
}