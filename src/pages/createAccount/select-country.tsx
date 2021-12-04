import Header from 'components/Header';
import CustomSelect from 'components/CustomSelect';
import {useUser} from 'context/user-context';

const SelectCountry = () => {
  const {selectedCountry, setSelectedCountry} = useUser();
  return (
    <div className="h-screen">
      <Header content="1/5" />
      <div className="max-w-sm mx-auto mt-20">
        <div className="mb-14">
          <p className="text-primary font-bold text-lg">
            What country are you from?
          </p>
        </div>
        <div>
          <CustomSelect
            selected={selectedCountry}
            setSelected={setSelectedCountry}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectCountry;
