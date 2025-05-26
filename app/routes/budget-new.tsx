import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { accounts, categories } from "~/data/dummy-data";
import { NavLink } from "react-router";

// https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png

const BudgetNew = () => {
  return (
    <>
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-72 object-cover"
        />
        <div className="absolute bottom-2 left-2">
          <Button
            type="button"
            variant="outline"
            className="bg-primary text-primary-foreground rounded-full p-2"
          >
            <i className="ri-upload-line mr-2"></i>
            Upload
          </Button>
        </div>
      </div>

      <div className="py-6 px-2 sm:px-4 w-full">
        <form
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-white/80 rounded-lg p-4 shadow"
        >
        <div className="flex items-center col-span-2">
          <i
            className="ri-pencil-line cursor-pointer hover:bg-primary p-1 rounded-full hover:text-primary-foreground mr-2"
            onClick={() => {
              const input = document.createElement("input");
              input.className = "w-full text-3xl bg-transparent border-none focus:ring-0 focus:border-none focus:outline-none";
              input.type = "text";
              input.value = "New Budget";

              const container = document.querySelector("#budget-title");
              if (!container) return;

              container.innerHTML = "";
              container.appendChild(input);

              input.focus();
              input.setSelectionRange(input.value.length, input.value.length);

              input.addEventListener("blur", () => {
                container.innerHTML =
                  "<h1 className='text-3xl flex-1' id='budget-title'>New Budget</h1>";
              });

              input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                  container.innerHTML =
                    "<h1 className='text-3xl flex-1' id='budget-title'>" +
                    input.value +
                    "</h1>";
                }
              });
            }}
          ></i>
          <h1 className="text-3xl flex-1" id="budget-title">New Budget</h1>
        </div>
          {/* Currency */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm">Currency</Label>
            <Select value={"MYR"}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MYR">Malaysian Ringgit (MYR)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Amount */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm">Amount</Label>
            <div className="relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">MYR</span>
              </div>
              <Input
                placeholder="0.00"
                className="pl-12"
                value={""}
                onChange={(e) => {
                  const value = e.target.value;
                  // if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
                  //   setFormDetails((prev) => ({
                  //     ...prev,
                  //     amount: value,
                  //   }));
                  // }
                }}
              />
            </div>
          </div>
          {/* Period */}
          <div className="flex flex-col gap-1 col-span-2">
            <Label className="text-sm">Period</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="one-time">One-time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-sm">Categories</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-sm">Accounts</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select accounts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Start Date */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm">Start Date</Label>
            <Input
              type="date"
              className="w-full"
              value={""}
              onChange={(e) => {
                const value = e.target.value;

                // if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
                //   setFormDetails((prev) => ({
                //     ...prev,
                //     amount: value,
                //   }));
                // }
              }}
            />
          </div>
          {/* End Date */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm">End Date</Label>
            <Input
              type="date"
              className="w-full"
              value={""}
              onChange={(e) => {
                const value = e.target.value;

                // if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
                //   setFormDetails((prev) => ({
                //     ...prev,
                //     amount: value,
                //   }));
                // }
              }}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <NavLink to="/budgets"><i className="ri-arrow-left-line mr-2"></i>Cancel</NavLink>
            </Button>
            <Button type="submit"><i className="ri-save-line mr-2"></i>Create Budget</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BudgetNew;