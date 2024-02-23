"use client";
import { Icon } from "@iconify/react";

const TipsPage = () => {
  const tips = [
    {
      title: "Proper soil management",
      description:
        "Practices like crop rotation, cover crops and the use of organic matter help manage the soil properly.",
    },
    {
      title: "Efficient water management",
      description:
        "Proper irrigation system helps keep the soil healthy. We recommend using an automatic watering system.",
    },
    {
      title: "Effective pest management",
      description:
        "We recommend using organic farming practices to control pests. Pesticides can be harmful to plants.",
    },
    {
      title: "Understanding local climate and weather patterns",
      description:
        "Local weather patterns can affect crop yields. We recommend its usage for making the best use of resources available in the farm.",
    },
    {
      title: "Monitoring crop health",
      description:
        "We recommend using crop monitoring tools to monitor crop health. This can help us to understand the health of crops in the farm.",
    },
  ];

  return (
    <main className={"container pt-16"}>
      <div className="max-w-5xl mx-auto bg-white border rounded-xl">
        <div className="flex items-center gap-4 text-green-600 p-4 mb-4 border-b">
          <Icon icon={"icons8:idea"} width={30} />
          <h4>Tips and Tricks</h4>
        </div>
        <ul>
          {tips.map((tip, index) => (
            <li className="p-4 border-b" key={index}>
              <h4 className="text-lg font-bold flex items-center gap-1">
                <Icon
                  icon={"fluent:triangle-right-16-regular"}
                  width={10}
                  className={"text-green-600"}
                />
                <span>{tip.title}</span>
              </h4>
              <p className="text-gray-600">{tip.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default TipsPage;
