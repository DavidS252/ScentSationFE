import { Card, CardBody, CardHeader, Image, Radio, RadioGroup, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from "react";
import { getFragranceByBrand } from "../services/restaurants-service.ts";



export const Route = createLazyFileRoute('/home/restaurants')({
  component: Restaurants,
})

const zara = "zara"
const chanel = "chanel"
const dior = "dior"
const versace = "versace"
const armani = "armani"

function Restaurants () {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>(zara);
  const [fragrances, setRestaurants] = useState([]);
  console.log(fragrances)

  const {data, isFetching} = useQuery({
    queryKey: ["getRestaurants", selectedRestaurant],
    queryFn: () => getFragranceByBrand(selectedRestaurant),
    retry: false,
    refetchInterval: false,
  })

    useEffect(() => {
        if (data) {
          setRestaurants(Array.from({length: 9}, (_, index) => data[index]))
          }
    },[data])

    return (
        <div className="flex flex-col items-center justify-center m-5">
            <div className="flex items-center">
                <RadioGroup
                    className="flex items-center"
                    label="Select your brand"
                    orientation="horizontal"
                    value={selectedRestaurant}
                    onValueChange={setSelectedRestaurant}
                >
                    <Radio value={zara}>Zara</Radio>
                    <Radio value={chanel}>Chanel</Radio>
                    <Radio value={dior}>Dior</Radio>
                    <Radio value={versace}>Versace</Radio>
                    <Radio value={armani}>Armani</Radio>

                    {/* <Radio value={paris}>Paris</Radio>
                    <Radio value={berlin}>Berlin</Radio>
                    <Radio value={barcelona}>Barcelona</Radio>
                    <Radio value={rome}>Rome</Radio>
                    <Radio value={amsterdam}>Amsterdam</Radio> */}
                </RadioGroup>
            </div>
            {isFetching ? <Spinner style={{marginTop: "100px"}}/> :
            <div className="flex gap-4 grid grid-cols-3 grid-rows-3 px-4 py-2">
                {fragrances.map(perfume =>
                    <Card className="py-4" style={{height: "240px", width: "320px"}}>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <small className="text-default-500">{perfume.brand.split(" perfumes and")[0]}</small>
                            <h4 className="font-bold text-large">{perfume.perfume.split(" for ")[0]}</h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src={perfume.image}
                                width={300}
                                height={120}
                                style={{overflow: "hidden", maxHeight: "130px", display: "flex", objectFit: "contain"}}
                            />
                        </CardBody>
                    </Card>)}
            </div>
                    }
        </div>
    );
}