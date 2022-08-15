const id = Symbol();

const courseInfo = {
    title: 'JavaScript',
    topics: ['strings', 'arrays', 'objects'],
    id: 'js-course'
};

courseInfo[id] = 44; // gets added as Symbol() so no conflict

console.log(courseInfo);