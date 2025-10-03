import { Link, useLocation } from "react-router-dom";

const customMappings = {
  dashboard: "Dashboard",
  faculty: "Faculty & Staff",
  staff: "Staff",
  course: "Courses",
  campusLife: "Campus Life",
  news: "News",
  contactUs: "Contact Us",
  employment: "Employment",
  trustess: "Trustess",

  // Add additional mappings as needed
};

function Breadcrumb() {
  const location = useLocation();

  const getBreadcrumb = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);

    let accumulatedPath = "";
    const breadcrumbLinks = pathSegments.map((segment, index) => {
      accumulatedPath += `/${segment}`;

      const isLast = index === pathSegments.length - 1;

      const displayName =
        customMappings[segment] ||
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

      return (
        <span
          key={accumulatedPath}
          className="flex text-[16px] items-center gap-1"
        >
          {!isLast ? (
            <>
              <Link
                to={accumulatedPath}
                className="text-bhawaniRed hover:text-bhawaniDark transition-all duration-300"
              >
                {displayName}
              </Link>
              <span>/</span>
            </>
          ) : (
            <span className="text-gray-600">{displayName}</span>
          )}
        </span>
      );
    });

    return breadcrumbLinks;
  };

  return (
    <div className="text-lg font-medium border-b border-gray-200 pb-2 mb-4 flex flex-wrap gap-1">
      {getBreadcrumb()}
    </div>
  );
}

export default Breadcrumb;
