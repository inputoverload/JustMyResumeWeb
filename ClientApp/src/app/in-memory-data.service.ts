import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './models/user';
import { Job } from './models/job';
import { TechSkill } from './models/tech-skill';
import { EducationItem } from './models/education';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const user = {
      id: 1,
      firstName: 'Thomas',
      lastName: 'Woodward',
      streetAddress: '809 E. Bellville St.',
      city: 'Marion',
      state: 'KY',
      zipCode: '42064',
      phone: '615.517.5194',
      email: 'tom_woodward7@hotmail.com'
    };

    const jobs = [
      {id: 1, userId: 1, employer: 'Pure Air Internet', title: 'Founder', role: 'Network Designer/Entrepreneur', startDate: 'Jan 2016', endDate: 'May 2018', description: '<ul><li>Created business plan and pro forma financials based on demographic and statistical data.</li><li>Designed a Fixed Wireless network to service all of western Kentucky.</li><li>Interfaced with vendors and government funding sources.</li></ul>'},
      {id: 2, userId: 1, employer: 'Data Dimensions Corp.', title: 'Systems Analyst III', role: 'Full Stack Developer', startDate: 'Aug 2002', endDate: 'Oct 2015', description: '<ul><li>Designed, developed, maintained, and migrated internal accounting package responsible for employee incentive-based pay calculation, AR, AP, and Profit/Loss. Used Windows Forms, VB.NET, SQL Server.</li><li>Implemented and maintained intranet end-to-end workflow tracking that enabled piece-incentive pay resulting in 200% productivity increase. Used IIS, C#, ASP.NET, SQL Server.</li><li>Designed, implemented, and maintained package tracking portal for clients as an internet solution with nearly 1,000 registered users. Used IIS, C#, ASP.NET, SQL Server.</li><li>Created a REST service to interface with an Android application I built to provide tablet access to the production rate system.</li></ul>'},
      {id: 3, userId: 1, employer: 'Investment Scorecard', title: 'Programmer Analyst', role: 'Full Stack Microsoft Developer', startDate: 'Apr 2001', endDate: 'Mar 2003', description: '<ul><li>Maintained a classic ASP web application with thousands of users for investment performance reporting. Used ASP, DCOM, SQL Server, IIS, Active Directory.</li><li>Replaced Active Directory with SQL Server user authentication resulting in greater features and vastly improved scalability.</li><li>Implemented advanced financial analysis and charting feature set which resulted in large new sales.</li></ul>'},
      {id: 4, userId: 1, employer: 'Progressive Design Software (Insync, Inc.)', title: 'Business Partner', role: 'Java Developer', startDate: 'Dec 1999', endDate: 'Apr 2001', description: '<ul><li>Designed n-tiered platform to support web and internet applications.</li><li>Designed and coded CASE tool to automate the majority of application creation.</li><li>Interfaced with clients and coded a large n-tiered, object-oriented development effort in Visual Basic 6 and SQL Server to replace a legacy system.</li></ul>'},
      {id: 5, userId: 1, employer: 'United Systems and Software', title: 'Programmer Analyst', role: 'Full Stack Microsoft Developer', startDate: 'May 1997', endDate: 'Dec 1999', description: '<ul><li>Designed, built and maintained multiple object-oriented Visual Basic/SQL Server Line-of-business accounting solutions.</li><li>Designed an n-tiered object-oriented infrastructure and architecture which served as the basis for re-development of the company’s entire product line. Trained and assisted other developers in the use of that architecture.</li></ul>'}
    ];

    const skillCategories = [
      {id: 1, name: 'Languages'},
      {id: 2, name: 'APIs'},
      {id: 3, name: 'Databases'}
    ];

    const techSkills = [
      {id: 1, userId: 1, skillCategoryId: 1, name: 'C#', skillLevel: 'Expert'},
      {id: 2, userId: 1, skillCategoryId: 1, name: 'Java', skillLevel: 'Proficient'},
      {id: 3, userId: 1, skillCategoryId: 1, name: 'Visual Basic/VB.NET', skillLevel: 'Proficient'},
      {id: 4, userId: 1, skillCategoryId: 1, name: 'Javascript', skillLevel: 'Proficient'},
      {id: 12, userId: 1, skillCategoryId: 1, name: 'SQL', skillLevel: 'Expert'},
      {id: 23, userId: 1, skillCategoryId: 1, name: 'HTML', skillLevel: 'Expert'},
      {id: 24, userId: 1, skillCategoryId: 1, name: 'CSS', skillLevel: 'Proficient'},
      {id: 25, userId: 1, skillCategoryId: 1, name: 'TypeScript', skillLevel: 'Entry'},

      {id: 5, userId: 1, skillCategoryId: 2, name: 'ASP.NET', skillLevel: 'Expert'},
      {id: 6, userId: 1, skillCategoryId: 2, name: 'ASP.NET MVC', skillLevel: 'Proficient'},
      {id: 7, userId: 1, skillCategoryId: 2, name: 'Core ASP.NET', skillLevel: 'Proficient'},
      {id: 8, userId: 1, skillCategoryId: 2, name: 'Windows Forms', skillLevel: 'Expert'},
      {id: 9, userId: 1, skillCategoryId: 2, name: 'Angular 7', skillLevel: 'Proficient'},
      {id: 10, userId: 1, skillCategoryId: 2, name: 'AJAX', skillLevel: 'Proficient'},
      {id: 11, userId: 1, skillCategoryId: 2, name: 'JQuery', skillLevel: 'Proficient'},
      {id: 13, userId: 1, skillCategoryId: 2, name: 'Entity Framework', skillLevel: 'Proficient'},
      {id: 14, userId: 1, skillCategoryId: 2, name: 'REST Services', skillLevel: 'Expert'},
      {id: 15, userId: 1, skillCategoryId: 2, name: 'Android', skillLevel: 'Entry'},
      {id: 16, userId: 1, skillCategoryId: 2, name: 'LINQ', skillLevel: 'Proficient'},
      {id: 17, userId: 1, skillCategoryId: 2, name: 'WebAPI', skillLevel: 'Proficient'},
      {id: 26, userId: 1, skillCategoryId: 2, name: 'Angular', skillLevel: 'Entry'},
      {id: 26, userId: 1, skillCategoryId: 2, name: 'Angular Material', skillLevel: 'Entry'},

      {id: 20, userId: 1, skillCategoryId: 3, name: 'Microsoft SQL Server', skillLevel: 'Expert'},
      {id: 21, userId: 1, skillCategoryId: 3, name: 'MySQL', skillLevel: 'Proficient'},
      {id: 22, userId: 1, skillCategoryId: 3, name: 'Oracle', skillLevel: 'Entry'}
    ];

    const educationItems = [
      {id: 1, userId: 1, description: 'Harvard University', degree: 'One year, studied economics and some computer science.'},
      {id: 2, userId: 1, description: 'Vanderbilt University School of Engineering', degree: 'One and a half years, completed computer science curriculum but not degree requirements.'}
    ];

    const projects = [
      {id: 1, userId: 1, name: 'Dynamic Resume', description: 'A dynamically built resume application capable of hosting multiple resumes. The front end is built using Angular 7 and Angular 7 Material. The business object and data service tier is built using C# for .Net Core 2.2. The business and data tiers employe WepAPI and Entity Framework Core. The database is hosted in Microsoft SQL Server.', demoUrl: 'https://www.justmyresume.com', gitHubUrl: 'https://somegithub.com' }
  ];
    
      return {user, jobs, skillCategories, techSkills, educationItems, projects};
    //return { user };
  }

  constructor() { }
}
