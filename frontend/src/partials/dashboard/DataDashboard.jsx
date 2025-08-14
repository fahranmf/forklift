import React from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
import { chartAreaGradient } from "../../charts/ChartjsConfig";
import EditMenu from "../../components/DropdownEditMenu";

// Import utilities
import { adjustColorOpacity, getCssVariable } from "../../utils/Utils";

function DataDashboard() {
  const statuses = [
    {
      label: "Working",
      count: 5,
      color: "#6FA76B",
      icon: (
        <svg
          width="27"
          height="26"
          viewBox="0 0 27 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.51 0.512955C6.57427 0.512955 0.945251 6.14197 0.945251 13.0777C0.945251 20.0135 6.57427 25.6425 13.51 25.6425C20.4458 25.6425 26.0748 20.0135 26.0748 13.0777C26.0748 6.14197 20.4458 0.512955 13.51 0.512955ZM8.48412 19.9884C6.75018 19.9884 5.34292 18.5811 5.34292 16.8472C5.34292 15.1132 6.75018 13.706 8.48412 13.706C10.2181 13.706 11.6253 15.1132 11.6253 16.8472C11.6253 18.5811 10.2181 19.9884 8.48412 19.9884ZM10.3688 8.05182C10.3688 6.31788 11.7761 4.91063 13.51 4.91063C15.244 4.91063 16.6512 6.31788 16.6512 8.05182C16.6512 9.78576 15.244 11.193 13.51 11.193C11.7761 11.193 10.3688 9.78576 10.3688 8.05182ZM18.5359 19.9884C16.802 19.9884 15.3947 18.5811 15.3947 16.8472C15.3947 15.1132 16.802 13.706 18.5359 13.706C20.2699 13.706 21.6771 15.1132 21.6771 16.8472C21.6771 18.5811 20.2699 19.9884 18.5359 19.9884Z"
            fill="#6FA76B"
          />
        </svg>
      ),
    },
    {
      label: "Charging",
      count: 2,
      color: "#FBBF24",
      icon: (
        <svg
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.2908 5.02591H18.1925V3.76943C18.1925 3.07837 17.6271 2.51295 16.936 2.51295H14.4231C13.732 2.51295 13.1666 3.07837 13.1666 3.76943V5.02591H11.0683C10.151 5.02591 9.39716 5.7798 9.39716 6.69703V25.9588C9.39716 26.8886 10.151 27.6425 11.0808 27.6425H20.2783C21.208 27.6425 21.9619 26.8886 21.9619 25.9714V6.69703C21.9619 5.7798 21.208 5.02591 20.2908 5.02591ZM18.959 16.6358L15.6042 22.9182C15.3026 23.4836 14.4231 23.27 14.4231 22.6166V18.2189H12.953C12.4755 18.2189 12.174 17.7163 12.4001 17.2891L15.7549 11.0067C16.0565 10.4413 16.936 10.6549 16.936 11.3083V15.706H18.4061C18.871 15.706 19.1851 16.2086 18.959 16.6358Z"
            fill="#FF9D00"
          />
        </svg>
      ),
    },
    {
      label: "Idle",
      count: 0,
      color: "#3B82F6",
      icon: (
        <svg
          width="25"
          height="22"
          viewBox="0 0 25 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.71579 21.386H21.6383C23.5733 21.386 24.7795 19.2877 23.8121 17.6166L14.3508 1.26983C13.3833 -0.401284 10.9708 -0.401284 10.0034 1.26983L0.542083 17.6166C-0.425405 19.2877 0.780813 21.386 2.71579 21.386V21.386ZM12.1771 12.5907C11.486 12.5907 10.9206 12.0253 10.9206 11.3342V8.82126C10.9206 8.1302 11.486 7.56478 12.1771 7.56478C12.8681 7.56478 13.4335 8.1302 13.4335 8.82126V11.3342C13.4335 12.0253 12.8681 12.5907 12.1771 12.5907ZM13.4335 17.6166H10.9206V15.1037H13.4335V17.6166Z"
            fill="#FFE735"
          />
        </svg>
      ),
    },
    {
      label: "Fault",
      count: 0,
      color: "#EF4444",
      icon: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.662 0.512955C5.7262 0.512955 0.109741 6.14197 0.109741 13.0777C0.109741 20.0135 5.7262 25.6425 12.662 25.6425C19.6103 25.6425 25.2393 20.0135 25.2393 13.0777C25.2393 6.14197 19.6103 0.512955 12.662 0.512955ZM12.6745 23.1296C7.12089 23.1296 2.6227 18.6314 2.6227 13.0777C2.6227 7.5241 7.12089 3.02591 12.6745 3.02591C18.2281 3.02591 22.7263 7.5241 22.7263 13.0777C22.7263 18.6314 18.2281 23.1296 12.6745 23.1296ZM12.3981 6.79534H12.3227C11.8201 6.79534 11.418 7.19742 11.418 7.70001V13.6306C11.418 14.0703 11.6442 14.485 12.0337 14.7112L17.2481 17.8398C17.6753 18.0911 18.2282 17.9654 18.4794 17.5382C18.7433 17.111 18.6051 16.5456 18.1653 16.2943L13.3028 13.4044V7.70001C13.3028 7.19742 12.9007 6.79534 12.3981 6.79534V6.79534Z"
            fill="#0091FF"
          />
        </svg>
      ),
    },
    {
      label: "Offline",
      count: 3,
      color: "#9CA3AF",
      icon: (
        <svg
          width="31"
          height="31"
          viewBox="0 0 31 31"
          className="fill-black dark:fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_49_113)">
            <path
              d="M29.7974 8.79535C29.232 8.36814 23.603 3.76944 15.172 3.76944C13.5135 3.76944 11.968 3.94534 10.5356 4.2469L23.2512 16.9625L29.7974 8.79535ZM5.27099 2.52552C4.78096 2.0355 3.98938 2.0355 3.49935 2.52552C3.00933 3.01555 3.00933 3.80713 3.49935 4.29716L5.1956 5.9934C2.49417 7.23732 0.835621 8.56918 0.546631 8.79535L13.2119 24.5767C14.2171 25.8332 16.127 25.8332 17.1321 24.5767L20.0849 20.8952L23.3643 24.1746C23.8543 24.6647 24.6459 24.6647 25.1359 24.1746C25.6259 23.6846 25.6259 22.893 25.1359 22.403L5.27099 2.52552Z"
              fill-opacity="0.54"
            />
          </g>
          <defs>
            <clipPath id="clip0_49_113">
              <rect
                width="30.1555"
                height="30.1555"
                fill="white"
                transform="translate(0.0942383)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col col-span-full bg-white dark:bg-gray-800 shadow-xs rounded-xl h-full w-full">
      <div className="px-5 pt-10 h-full flex flex-col min-h-0">
        <header className="flex justify-center items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Assets
          </h2>
        </header>

        {/* area sisa tinggi kartu */}
        <div className="flex-1 min-h-0 flex p-10 pt-5">
          <div className="my-auto w-full flex items-center justify-between  gap-6 overflow-x-auto">
            {statuses.map((s) => (
              <div key={s.label} className="flex items-center gap-3 shrink-0">
                {s.icon}
                <div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 leading-none">
                    {s.count}
                  </div>
                  <div className="text-sm font-semibold text-gray-500 dark:text-gray-100 uppercase">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Label 

        <br />
        <div className="flex-1 min-h-0 flex p-10 pt-5">
          <div className="my-auto w-full flex items-center justify-between  gap-6 overflow-x-auto">
          {statuses.map(({ label, icon, count }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-3 shrink-0 text-center"
            >
              
              <div className="flex items-center justify-center">{icon}</div>

              <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 leading-none">
                {count}
              </div>

              <div className="text-sm font-semibold text-gray-500 dark:text-gray-100 uppercase">
                {label}
              </div>
            </div>
          ))}
        </div>
        

        {/* /Row status */}
        </div>
      </div>
    </div>
  );
}

export default DataDashboard;
