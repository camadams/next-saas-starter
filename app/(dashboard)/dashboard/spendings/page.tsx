"use server";

import { spendingTable } from "@/lib/db/schema";
import { db } from "@/lib/db/drizzle";

function getCategoryColor(category: string) {
  switch (category.toLowerCase()) {
    case 'coffee':
      return 'bg-orange-200 text-orange-800';
    case 'food':
      return 'bg-red-200 text-red-800';
    case 'grocery':
      return 'bg-blue-200 text-blue-800';
    case 'clothes':
      return 'bg-purple-200 text-purple-800';
    case 'medical':
      return 'bg-red-500 text-white';
    case 'beer':
      return 'bg-yellow-200 text-yellow-800';
    case 'petrol':
      return 'bg-gray-700 text-white';
    default:
      return 'bg-gray-200 text-gray-800';
  }
}

export default async function CategoryPage() {
  const spendings = await db.select().from(spendingTable);
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-2 py-2 text-left text-xs sm:text-sm md:text-base">Date</th>
            <th className="px-2 py-2 text-left text-xs sm:text-sm md:text-base">Description</th>
            <th className="px-2 py-2 text-right text-xs sm:text-sm md:text-base">Amount</th>
            <th className="px-2 py-2 text-left text-xs sm:text-sm md:text-base">Category</th>
          </tr>
        </thead>
        <tbody>
          {spendings.map((spending, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-2 py-2 text-xs sm:text-sm md:text-base">{spending.date.toLocaleDateString()}</td>
              <td className="px-2 py-2 text-xs sm:text-sm md:text-base">{spending.description}</td>
              <td className="px-2 py-2 text-right text-xs sm:text-sm md:text-base">{spending.price}</td>
              <td className="px-2 py-2">
                <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-semibold ${getCategoryColor(spending.category || 'unknown')}`}>
                  {spending.category || 'unknown'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
