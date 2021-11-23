const fn = {
    add: (num1, num2) => num1 + num2,
    makeUser : (name, age) => ({name, age, gender:undefined}),
    throwErr: () => {
        throw new Error('xx');
    },
    getName: (callBack) => {
        const name = 'Leo';
        setTimeout(() => {
            callBack(name);
            // throw new Error('server error');
        }, 3000);
    },
    getAge: () => {
        const age = 25;
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(age);
                // rej('error');
            }, 3000);
        })
    }
};

module.exports = fn;
