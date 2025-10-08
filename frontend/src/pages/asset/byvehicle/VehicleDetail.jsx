import { useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getForkliftsDetail } from "../../../services/forklift";
import Header from "../../../partials/HeaderAsset";
import NavbarAsset from "./MenuAsset";
import Loading from "../../../components/Loading";
import StatusBadge from "../../../components/StatusBadge";

function VehicleDetail() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getForkliftsDetail(id);
        setVehicle(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id]);

  if (!vehicle) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-dvh max-h-dvh ">
      <div className="relative flex flex-col flex-1 min-h-0">
        <Header variant="v1" title={vehicle.name} path={"/asset/vehicle"} />

        <main className="grow min-h-0">
          <div className="h-full flex flex-col min-h-0 px-4 sm:px-6 lg:px-8 w-dvw mx-auto">
            {/* Basic Info selalu tampil */}
            <div className="p-2">
              <h1 className="text-2xl text-gray-800 dark:text-gray-100 font-bold py-4">
                Basic Info
              </h1>

              <div className="grid grid-cols-3 grid-rows-3 gap-4">
                <div>
                  <p>
                    Model:{" "}
                    <span className="text-gray-800 dark:text-gray-100">
                      {vehicle.model}
                    </span>
                  </p>
                </div>
                <div className="col-start-1 row-start-2">
                  <p className="flex items-center gap-2">
                    Status: <StatusBadge status={vehicle.status} />
                  </p>
                </div>
                <div className="col-start-1 row-start-3">
                  <p>
                    Serial:{" "}
                    <span className="text-gray-800 dark:text-gray-100">
                      {vehicle.serialNumber}
                    </span>
                  </p>
                </div>
                <div className="col-start-2 row-start-1">
                  <p>
                    Key-on Hours:{" "}
                    <span className="text-gray-800 dark:text-gray-100">
                      {vehicle.keyOnHours} h
                    </span>
                  </p>
                </div>
                <div className="col-start-2 row-start-2">
                  <p>
                    Last Online:{" "}
                    <span className="text-gray-800 dark:text-gray-100">
                      {vehicle.lastOnlineISO}
                    </span>
                  </p>
                </div>
                <div className="col-start-2 row-start-3">
                  <p>
                    Manufacture Date:{" "}
                    <span className="text-gray-800 dark:text-gray-100">
                      {vehicle.manufactureDate}
                    </span>
                  </p>
                </div>
                <div className="col-start-3 row-start-1">
                  <p>
                    Address:{" "}
                    <span className="text-gray-800 dark:text-gray-100">
                      {vehicle.address}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Navbar */}
            <NavbarAsset />
            {/* Nested route tampil di bawah Basic Info */}
            <div className="p-2 h-full">
              <Outlet context={{ vehicle }} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default VehicleDetail;
