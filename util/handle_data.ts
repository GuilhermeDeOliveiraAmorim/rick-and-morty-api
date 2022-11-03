import myData from "../data/data.json";

interface ILocation {
  name: string;
}
interface ICharacter {
  id: string;
  name: string;
  species: string;
  status: string;
  type: string;
  location: ILocation;
  episode: string;
}

export const handleJson = (character: ICharacter | undefined, myData: any) => {
  const newData = myData.push(character);
  console.log(myData);
  return newData;
};
