const Complaint = require("../Models/Complaint");

exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await Complaint.aggregate([
      {
        $facet: {
          // 1. Top Row Metrics
          metrics: [
            {
              $group: {
                _id: null,
                total: { $sum: 1 },
                resolved: { $sum: { $cond: [{ $eq: ["$status", "Resolved"] }, 1, 0] } },
                pending: { $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] } },
              },
            },
          ],
          // 2. Department Pie Chart
          byDepartment: [
            { $group: { _id: "$department", complaints: { $sum: 1 } } },
            { $project: { name: "$_id", complaints: 1, _id: 0 } },
          ],
          // 3. Monthly Line Chart
          monthlyTrends: [
            {
              $group: {
                _id: { $month: "$createdAt" },
                total: { $sum: 1 },
                resolved: { $sum: { $cond: [{ $eq: ["$status", "Resolved"] }, 1, 0] } },
                pending: { $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] } },
              },
            },
            { $sort: { "_id": 1 } }
          ],
          // 4. Category Area Chart (Hostel vs Faculty vs Dept)
          categoryTrends: [
            {
              $group: {
                _id: { 
                    month: { $month: "$createdAt" },
                    category: "$category"
                },
                count: { $sum: 1 }
              }
            }
          ]
        },
      },
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Format Monthly Trends
    const formattedMonthly = stats[0].monthlyTrends.map(m => ({
      ...m,
      month: monthNames[m._id - 1]
    }));

    // Format Category Trends for the Area Chart
    const categoryData = [];
    monthNames.forEach((m, index) => {
        const monthNum = index + 1;
        const monthObj = { month: m, Hostel: 0, Faculty: 0, Department: 0 };
        stats[0].categoryTrends.forEach(item => {
            if(item._id.month === monthNum) {
                monthObj[item._id.category] = item.count;
            }
        });
        categoryData.push(monthObj);
    });

    res.json({
      metrics: stats[0].metrics[0] || { total: 0, resolved: 0, pending: 0 },
      departmentData: stats[0].byDepartment,
      monthlyTrends: formattedMonthly,
      categoryTrends: categoryData,
      // Placeholder for resolution time (requires complex date math, but adding static for now)
      resolutionData: [
        { range: "0-1 day", count: 12 },
        { range: "1-3 days", count: 18 },
        { range: "3-7 days", count: 7 },
        { range: "7+ days", count: 3 },
      ]
    });
  } catch (err) {
    res.status(500).json({ message: "Analytics Error", error: err.message });
  }
};