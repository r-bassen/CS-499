//============================================================================
// Name        : ProjectTwo.cpp
// Author      : Rachelle Bassen
// Version     : 1.0
// Copyright   : Copyright © 2023 SNHU COCE
// Description : Module 7 project 2
//============================================================================

#include <algorithm>
#include <iostream>
#include <string> // atoi
#include <vector>
#include <fstream>
#include <sstream>

using namespace std;

//============================================================================
// Global definitions visible to all methods and classes
//============================================================================


// define a structure to hold course information
struct Course {
    string courseNumber; // unique identifier
    string title;
    vector<string> prerequisites;
};

// forward declarations
bool courseTypeNum(const Course& a, const Course& b);
std::string prefixCourse(const string& courseNumber);
int numCourse(const string& courseNumber);



//============================================================================
// Core Program Functions
//============================================================================


/**
 * Load CSV file of courses into vector using ifstream.
 * Each row corresponds with a course.
 */

vector<Course> openFile(const string& csvPath) {
    vector<Course> courses;
    ifstream input(csvPath);

    if (!input.is_open()) {     // error handling
        cerr << "Couldn't read file: " << csvPath << "\n";
        return {};
    }
    string line;

    // try getline to separate courseNumber, title, and prerequisites by commas 
    try {
        while (getline(input, line)) {  // loop through each row
            istringstream ss(line);
            Course course;

            getline(ss, course.courseNumber, ',');
            getline(ss, course.title, ',');

            string prereqsLine;
            getline(ss, prereqsLine);

            stringstream ssPrereqs(prereqsLine);
            string prereq;

            // handle extra commas or space for reading prerequisites
            while (getline(ssPrereqs, prereq, ',')) {
                prereq.erase(0, prereq.find_first_not_of(' '));
                prereq.erase(prereq.find_last_not_of(' ') + 1);
                
                if (!prereq.empty()) {
                    course.prerequisites.push_back(prereq);
                }
            }

        courses.push_back(course);
        }

    }

    catch (const exception& e) {
        cerr << e.what() << endl;
    }
    
    return courses;

}


/*
* Sorting function compares course numbers.
* Sorts prefix (first four characters) alphabetically,
* then sorts numeric portion starting with 4th index.
*/
bool courseTypeNum(const Course& a, const Course& b) {
    string typeA = prefixCourse(a.courseNumber);
    string typeB = prefixCourse(b.courseNumber);
    int numA = numCourse(a.courseNumber);
    int numB = numCourse(b.courseNumber);

    // first check prefixes, then check numbers for order
    return (typeA != typeB) ? typeA < typeB : numA < numB;
}

// Assign the prefix course number starting at index 0 and for the first four elements.
std::string prefixCourse(const string& courseNumber) {
    return courseNumber.substr(0, 4);
}

// Assign the numbers in the course number starting at index 4.
int numCourse(const string& courseNumber) {
    return stoi(courseNumber.substr(4));
}

// sort method
void sortCourses(vector<Course>& courses) {
    std::sort(courses.begin(), courses.end(), courseTypeNum);
}


/* 
* Print method for sorted courses by course number and title.
*/
void printSortedCourses(vector<Course>& courses) {
    sortCourses(courses);

    for (const auto& course : courses) {
        cout << course.courseNumber << ", " << course.title << endl;
    }

}

/*
* Print method for courses and prerequisites.
* First check for user input of course number, and
* handle multiple prerequisites after each comma.
*/
void printPreReqCourses(const vector<Course>& courses, 
    const string& courseNumber) {
 
    for (const auto& course : courses) {
        if (course.courseNumber == courseNumber) {
            cout << course.courseNumber << ", " << course.title << endl;

            if (course.prerequisites.empty()) {
                cout << "No prerequisites." << endl; 
            }
            else {
                cout << "Prerequisites: ";

                // for loop to store multiple prerequisites
                for (size_t i = 0; i < course.prerequisites.size(); ++i) {
                    cout << course.prerequisites[i];

                    if (i != course.prerequisites.size() - 1) {   //clear extra comma
                        cout << ", ";
                    }
                }
                cout << endl;
            }
            return;
        }
    }
    cout << "Course not found" << endl;
}

// Switch menu function for loading menu and accepts user input.
/* Menu items 1-3 call openFile method to load CSV and print functions,
* and case 3 requests user input of a courseNumber.
*/
void switchMenu(vector<Course>& courses, const string& csvPath) {
    int choice = 0;

    cout << "\nWelcome to the course planner: \n" << endl;
    while (choice != 9) {
        cout << "\n  1. Load Data Structure." << endl;
        cout << "  2. Print Course List." << endl;
        cout << "  3. Print Course." << endl;
        cout << "  9. Exit" << endl;
        cout << "\nWhat would you like to do? ";
        cin >> choice;

        switch (choice) {

        case 1:
            courses = openFile(csvPath);   
            if (courses.empty()) {
                cout << "File is empty." << endl;   // notice of empty file
            }
            else {
                cout << "Courses loaded successfully."<< endl;
            }
            break;

        case 2:
            cout << "Here is a sample schedule: " << "\n" << endl;
            printSortedCourses(courses);
            break;

        case 3: {
            string courseNumber;
            cout << "What course do you want to know about? ";
            cin >> courseNumber;

            // transform user input with lower case to upper case
            std::transform(courseNumber.begin(), courseNumber.end(), 
                courseNumber.begin(), ::toupper);

            printPreReqCourses(courses, courseNumber);
            break;
        }

        case 9:
            cout << "Thank you for using the course planner!" << endl;
            break;

        default:
            cout << choice << " is not a valid option." << endl;
            break;
        }
    }
}

// main method
/* load CSV file and call menu function
*/
int main() {
    vector<Course> courses;

    string csvPath = "CS 300 ABCU_Advising_Program_Input.csv";
    switchMenu(courses, csvPath);

    return 0;
}


