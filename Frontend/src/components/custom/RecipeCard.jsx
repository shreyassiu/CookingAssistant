import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const RecipeCard = (props) => {
  return (
    <div>
      <Card className="w-64 h-60 shadow-sm rounded-md border hover:shadow-md transition-shadow duration-300">
        <img
          src={props.image}
          alt=""
          className="w-full h-40 object-contain rounded-t-md bg-white p-2 h-"

        />
        <div className="flex flex-col justify-between">
          <CardHeader className="pb-2 px-4">
            <CardTitle className="text-base font-semibold line-clamp-2">
              {props.title}
            </CardTitle>
          </CardHeader>
        </div>
      </Card>
    </div>
  );
};

export default RecipeCard;
