const fn = require('./fn');

// toBe
// not
test('1 = 1', () => {
    expect(1).toBe(1);
});
test('2 + 3 = 5', () => {
    expect(fn.add(2,3)).toBe(5);
});
test('3 + 3 != 5', () => {
    expect(fn.add(3,3)).not.toBe(5);
});


// toEqual
// toStrictEqual : 엄격 모드
test('name, age 출력', () => {
    // object의 경우 toBe() 대신 toEqual() 사용
    expect(fn.makeUser("leo", 25)).toEqual({"name": "leo", "age": 25});
});
// test('name, age 출력', () => {
//     // 엄격 모드 (undefined 걸림)
//     expect(fn.makeUser("leo", 25)).toStrictEqual({"name": "leo", "age": 25});
// });


// toBeNull
// toBeUndefined
// toBeDefined
test('null = null', () => {
    expect(null).toBeNull();
});


// toBeTruthy : 참인지
// toBeFalsy : 거짓인지
test('0 = false', () => {
    expect(fn.add(1, -1)).toBeFalsy();
});


// toBeGreaterThan 크다
// toBeGreaterThanOrEqual 크거나 같다
// toBeLessThan 작다
// toBeLessThanOrEqual 작거나 같다
test('ID <= 10', () => {
    const id = "THE_BLACK";
    expect(id.length).toBeLessThanOrEqual(10);
});
test('password = 4', () => {
    const password = "1234";
    expect(password.length).toBe(4);
});
test('password = 4', () => {
    const password = "1234";
    expect(password.length).toEqual(4);
});


// toBeCloseTo
test('0.1 + 0.2 = 0.3', () => {
    // 소수를 이진법으로 바꿨을 때 몇몇숫자는 무한수로 변경되기 떄문에 toBe() 쓰면 안됨. toBeCloseTo()를 써야 함
    expect(fn.add(0.1, 0.2)).toBe(0.30000000000000004);
});
test('0.1 + 0.2 = 0.3', () => {
    // 소수를 이진법으로 바꿨을 때 몇몇숫자는 무한수로 변경되기 떄문에 아래처럼 쓰면 안됨. toBeCloseTo()를 써야 함
    expect(fn.add(0.1, 0.2)).toBeCloseTo(0.3);
});


// toMatch : 문자열 정규식으로 체크
test('Hello World in H', () => {
    expect('Hello World').toMatch(/H/);
});


// toContain
test('userList in Leo', () => {
    const user = 'Leo';
    const userList = ['Mark', "Max", "Han", "Leo"];
    expect(userList).toContain(user);
});

// toThrow
test('error', () => {
    expect(() => fn.throwErr()).toThrow();
});
test('error = xx', () => {
    expect(() => fn.throwErr()).toThrow('xx');
});


// 비동기 함수 테스트 (콜백 패턴)
// jest는 실행이 끝에 도달하게 되면 끝나기 때문에 콜백 함수가 호출되지 않음. 때문에 밑의 코드는 제대로 동작 안됨
test('name = leo', () => {
    function callback(name) {
        expect(name).toBe("Leo");
    }
    fn.getName(callback);
});
// 해결 방안 done
test('name = leo', (done) => {
    function callback(name) {
        expect(name).toBe("Leo");
        done();
    }
    fn.getName(callback);
});
// try / catch
test('name = leo', done => {
    function callback(name) {
        try {
            expect(name).toBe("Leo");
            done();
        } catch (err) {
            done();
        }
    }
    fn.getName(callback);
});


// 비동기 함수 테스트 (promise 패턴) return을 해줘야 함!!
test('age = 25', () => {
    return fn.getAge().then(age => {
        expect(age).toBe(25);
    });
});
// resolve, rejects
test('age = 25', () => {
    return expect(fn.getAge()).resolves.toBe(25);
});
test('age = 25', () => {
    return expect(fn.getAge()).rejects.toMatch('error');
});


//async, await
test('age is 25', async () => {
    const age = await fn.getAge();
    expect(age).toBe(25);
});
test('age is 25', async () => {
    await expect(fn.getAge()).resolves.toBe(25);
});

