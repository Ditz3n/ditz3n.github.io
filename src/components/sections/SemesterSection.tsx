// SemesterSection.tsx | A section component displaying my progress in my education at Aarhus University (Bachelor of Engineering in Software Technology)
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLanguage } from '../../hooks/useLanguage';
import { coursesData } from "../../data/CoursesData";

export default function SemesterSection() {
  const [expanded, setExpanded] = useState(false);
  const [expandedSemesters, setExpandedSemesters] = useState<{ [key: number]: boolean }>({});
  const { language } = useLanguage();

  // Memoize progress calculations to ensure they’re not misinterpreted as hook-related
  const progressData = useMemo(() => {
    const totalECTS = coursesData.reduce((total, course) => total + course.ects, 0);
    const completedECTS = coursesData
      .filter((course) => course.completed)
      .reduce((total, course) => total + course.ects, 0);
    const progressPercentage = (completedECTS / totalECTS) * 100;

    const semesterProgress: { [key: number]: { totalECTS: number; completedECTS: number; percentage: number } } = {};
    for (let semester = 1; semester <= 7; semester++) {
      const semesterCourses = coursesData.filter((course) => course.semester === semester);
      const semesterTotalECTS = semesterCourses.reduce((total, course) => total + course.ects, 0);
      const semesterCompletedECTS = semesterCourses
        .filter((course) => course.completed)
        .reduce((total, course) => total + course.ects, 0);
      
      semesterProgress[semester] = {
        totalECTS: semesterTotalECTS,
        completedECTS: semesterCompletedECTS,
        percentage: semesterTotalECTS > 0 ? (semesterCompletedECTS / semesterTotalECTS) * 100 : 0,
      };
    }

    return { totalECTS, completedECTS, progressPercentage, semesterProgress };
  }, []); // Empty dependency array since coursesData is static

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  const handleSemesterToggle = (semester: number) => {
    setExpandedSemesters((prev) => ({
      ...prev,
      [semester]: !prev[semester],
    }));
  };

  return (
    <section className="grid grid-cols-1 gap-6 h-min w-full justify-items-center items-center relative overflow-hidden p-0">
      <div className="col-span-1 flex flex-col bg-[#121212] rounded-[48px] flex-nowrap gap-4 w-full justify-center overflow-hidden relative border border-[#292929]">
        <button
          onClick={handleToggle}
          className="flex items-center justify-center w-full p-6 hover:bg-[#292929] transition-colors cursor-pointer relative"
        >
          <h2 className="text-2xl text-white font-semibold text-center">
            {language === "da"
              ? "Diplomingeniør i Softwareteknologi"
              : "Bachelor of Engineering in Software Technology"}
          </h2>
          <motion.div 
            animate={{ rotate: expanded ? 90 : 0 }} 
            transition={{ duration: 0.2 }} 
            className="absolute right-6"
          >
            <ChevronRight size={24} color="white" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              className="flex flex-col gap-4 w-full"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white">{language === "da" ? "Færdiggjort:" : "Completed:"} {progressData.completedECTS} ECTS</span>
                  <span className="text-white">Total: {progressData.totalECTS} ECTS</span>
                </div>
                <div className="w-full bg-[#292929] rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-[#05C9F9] to-[#E5F61B] h-4 rounded-full"
                    style={{ width: `${progressData.progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">{progressData.progressPercentage.toFixed(2)}%</span>
                  <a
                    href="https://bachelor.au.dk/softwareteknologi"
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://bachelor.au.dk/softwareteknologi
                  </a>
                </div>
              </div>
              {/* Mapping through semesters and displaying them */}
              {[1, 2, 3, 4, 5, 6, 7].map((semester, index, array) => {
                const isLastSemester = index === array.length - 1;
                const semesterCourses = coursesData.filter((course) => course.semester === semester);
                const isSemesterExpanded = expandedSemesters[semester] || false;

                return (
                  <div
                    key={semester}
                    className={`p-4 border border-r-0 border-b-0 border-l-0 border-[#292929] bg-[#121212] ${
                      isLastSemester 
                        ? isSemesterExpanded 
                          ? "mb-11 border-b-1"
                          : "mb-11 pb-8 border-b-1"
                        : ""
                    }`}
                  >
                    <button
                      onClick={() => handleSemesterToggle(semester)}
                      className="flex items-center justify-between w-full hover:bg-[#1a1a1a] transition-colors cursor-pointer rounded-lg p-2"
                    >
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center w-full">
                          <h3 className="text-xl text-white font-semibold">Semester {semester}</h3>
                          <motion.div 
                            animate={{ rotate: isSemesterExpanded ? 90 : 0 }} 
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight size={20} color="white" />
                          </motion.div>
                        </div>
                        
                        {/* Semester progress bar */}
                        <div className="w-full mt-2">
                          <div className="flex justify-between items-center text-sm mb-1">
                            <span className="text-white">{language === "da" ? "Færdiggjort:" : "Completed:"} {progressData.semesterProgress[semester].completedECTS} ECTS</span>
                            <span className="text-white">Total: {progressData.semesterProgress[semester].totalECTS} ECTS</span>
                          </div>
                          <div className="w-full bg-[#292929] rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-[#05C9F9] to-[#E5F61B] h-3 rounded-full"
                              style={{ width: `${progressData.semesterProgress[semester].percentage}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {progressData.semesterProgress[semester].percentage.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isSemesterExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4"
                        >
                          {/* Mapping through courses in the semester and displaying them */}
                          {semesterCourses.map((course, courseIndex, courseArray) => {
                            const isLastCourseInSemester = courseIndex === courseArray.length - 1;
                            const isLastCourseInLastSemester = isLastSemester && isLastCourseInSemester;
                            
                            return (
                              <div
                                key={course.id}
                                className={`p-4 rounded-lg border border-[#292929] ${
                                  course.completed
                                    ? "bg-gradient-to-r from-[#05C9F9]/70 to-[#E5F61B]/70"
                                    : "bg-[#121212] border-[#292929]"
                                } ${isLastCourseInSemester ? "mb-0" : "mb-2"} ${
                                  isLastCourseInLastSemester ? "mb-4" : ""
                                }`}
                              >
                                <h4 className="text-lg text-white font-semibold">
                                  {language === "da" ? course.name.da : course.name.en}
                                </h4>
                                <p className="text-white">{course.ects} ECTS</p>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}