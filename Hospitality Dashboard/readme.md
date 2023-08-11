# Data Analytics Project in the Hospitality Domain

Welcome to my data analytics project focused on the hospitality industry. This project aims to provide revenue insights for a fictional company, "Lake Grants," operating multiple 5-star hotels across India. The project involves the use of Power BI, exploration of key business concepts in hotels, and the execution of a data analytics project.

## Problem Statement

- Lake Grants, a company facing competition in the hotel industry, seeks to generate revenue insights for management.
- The dataset includes hotel information, room types, booking data, aggregated bookings, and metric lists.
- Challenge Number One on Codebasics provides the problem statement and dataset.

## Key Metrics for the Dashboard

1. **Revenue (RevPAR - Revenue per Available Room)**
2. **Occupancy Percentage**
3. **Average Daily Rate (ADR)**
4. **Daily Sellable Room Nights (DSRN)**
5. **Realization**
6. **Weekend vs. Weekday Split**
7. **Channel-level Analysis**
8. **City-level Analysis**
9. **Property-level Analysis**

## Dashboard Design

- **Top-Level Metrics**: Revenue, Occupancy Percentage, ADR, DSRN, Realization.
- **Filters**: City, Status (weekend/weekday), Platform (channel), Property.
- **Visualizations**: Weekly and monthly trends, allowing interactive exploration.

## Dashboard Contents

1. **Occupancy Fluctuations**: Identify seasonal occupancy trends to optimize resource allocation.
2. **Flat Pricing Strategy**: Optimize pricing based on consistent ADR across weeks.
3. **Weekday-Weekend Pricing**: Implement dynamic pricing based on demand fluctuations.
4. **Occupancy-Rating Correlation**: Understand how ratings impact occupancy.
5. **Channel Performance**: Analyze booking sources for resource allocation.
6. **Opportunity Identification**: Identify areas for improvement in low-occupancy hotels.
7. **Promotional Opportunities**: Targeted promotions to increase direct bookings.
8. **Pricing Elasticity**: Balance pricing for optimal revenue and occupancy.
9. **Level 3 and Level 4 Analysis**: Fine-tune pricing based on specific room categories.
10. **Collaborative Decision-Making**: Industry expert feedback for effective decisions.

## Learnings from the Project

1. **Effective Stakeholder Communication**: Understand business needs for relevant dashboards.
2. **Balancing Data Depth and Simplicity**: User-friendly design for quick insights.
3. **Importance of User-Focused Design**: Tailored dashboards for business stakeholders.
4. **Data-Driven Decision Making**: Insights drive strategic discussions and improvements.
5. **Holistic View for Actionable Insights**: Comprehensive metrics and filtering options.
6. **Iterative Development and Feedback Loop**: MVP to final version with stakeholder feedback.
7. **Data Privacy and Ethics**: Considerations in pricing strategies across platforms.
8. **Continuous Learning and Adaptation**: Ongoing dashboard updates for changing trends.
9. **Importance of Domain Knowledge**: Understand industry nuances for meaningful analysis.
10. **Collaboration and Synergy**: Combined expertise for valuable decision-making.

Feel free to explore the dashboard, metrics, and insights to enhance hotel performance and stay competitive.

## Getting Started

To explore this project, follow these steps:

1. Clone the repository to your local machine.
2. Access the dataset from [Challenge Number One](https://codebasics.io/) on Codebasics.
3. Load the dataset into Power BI, perform data cleaning, create DAX and interact with the dashboard.
4. Analyze the key metrics and insights provided.
5. Share feedback and collaborate for improvements.

## Data Loading and Power Query Documentation


1. Create a folder in Desktop and store all the csv files related to hospitality challenge.
2. Open a Power BI file, and In "Get Data", select the option as folder and browse through the folder containing csv files.
3. Then go to Tranform data to expand each and every dataset.
4. Now, duplicate the data source 4 times and in each one, expand one dataset by clicking on "Binary" option. also, rename 
   the tables accordingly.


## Power Query steps for tables: 
1. dim_date:
	- remove the column 'day_type'
	- we are deleting this because, we got a feedback from the mock dashboard review that Friday and Saturday are           
	  considered as weekends in the industry and not sunday. But In our datasets, saturday and sunday are considered           
	  as weekends. So we delete this column and re-create day_type using calculated columns.

2. dim_rooms
	- The column names are not captured here. We need to select "Use First Row as Headers" option .


## Acknowledgments

This project was made possible with the collaboration of data analysts and industry experts. Special thanks to Abhishek Anand from Oyo Rooms for his valuable insights.

## Credit
Codebasics youtube channel


