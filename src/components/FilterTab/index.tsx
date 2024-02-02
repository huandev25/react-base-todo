import { useTranslation } from "react-i18next";
import { FilterContainer } from "@/styles/FilterTabStyled";

type TFilterTabProps = {
  items: string[];
  onSelectFilter?: (key: string) => void;
  activeFilter: string;
};

const FilterTab = (props: TFilterTabProps) => {
  const { items, activeFilter, onSelectFilter } = props;
  const { t } = useTranslation();
  const onFilter = (item: string) => {
    onSelectFilter && onSelectFilter(item);
  };
  return (
    <FilterContainer>
      {items.map((item) => {
        return (
          <button
            onClick={() => onFilter(item)}
            key={item}
            className={`px-2 ${
              activeFilter === item
                ? "rounded border-2  text-white bg-yellow-600"
                : ""
            } `}
          >
            {t(item)}
          </button>
        );
      })}
    </FilterContainer>
  );
};
export default FilterTab;
