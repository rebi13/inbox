import {
  Badge,
  Code,
  Paper,
  Title,
  Text,
  Stack,
  Table,
  Anchor,
  Alert,
  List,
  Box,
  Container,
  Group,
} from "@mantine/core";
import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  description: string;
  mutates: boolean;
  children: ReactNode;
};

const Section = ({ title, description, mutates, children }: SectionProps) => (
  <Paper withBorder p="md" radius="md" mb="lg">
    <Stack gap="sm">
      <Group gap="sm">
        <Title order={4}>{title}</Title>
        <Badge color={mutates ? "red" : "green"} variant="light">
          {mutates ? "원본 변경" : "원본 유지"}
        </Badge>
      </Group>
      <Text c="dimmed" size="sm">
        {description}
      </Text>
      {children}
    </Stack>
  </Paper>
);

const ArrayMethodsPage = () => {
  const tableData = [
    ["forEach", "undefined", "X", "단순 순회"],
    ["map", "새 배열", "X", "변환"],
    ["filter", "새 배열", "X", "필터링"],
    ["reduce", "누적값", "X", "축소/집계"],
    ["find", "요소/undefined", "X", "검색"],
    ["findIndex", "인덱스/-1", "X", "인덱스 검색"],
    ["some", "boolean", "X", "하나라도 만족?"],
    ["every", "boolean", "X", "모두 만족?"],
    ["includes", "boolean", "X", "포함 여부"],
    ["slice", "새 배열", "X", "부분 추출"],
    ["splice", "삭제된 요소", "O", "삭제/삽입"],
    ["sort", "정렬된 배열", "O", "정렬"],
    ["reverse", "뒤집힌 배열", "O", "역순"],
    ["push/pop", "길이/요소", "O", "끝에 추가/제거"],
    ["shift/unshift", "요소/길이", "O", "앞에 제거/추가"],
    ["concat", "새 배열", "X", "배열 합치기"],
    ["join", "문자열", "X", "문자열 변환"],
    ["flat", "새 배열", "X", "평탄화"],
    ["flatMap", "새 배열", "X", "map + flat"],
  ];

  return (
    <Container size="md" p="xl">
      <Stack gap="xl">
        <Box>
          <Title order={1} mb="xs">
            JavaScript 배열 메서드 완전 정복
          </Title>
          <Text c="dimmed">
            JavaScript 배열 메서드는 면접에서 자주 출제되는 핵심 주제입니다. 각
            메서드의 동작 방식, 반환값, 원본 변경 여부를 정확히 이해하는 것이
            중요합니다.
          </Text>
        </Box>

        <Paper withBorder p="md" radius="md" bg="gray.0">
          <Title order={4} mb="sm">
            목차
          </Title>
          <Group gap="xl">
            <List size="sm" spacing="xs">
              <List.Item>
                <Anchor href="#iteration">순회 메서드 (forEach, map)</Anchor>
              </List.Item>
              <List.Item>
                <Anchor href="#search">
                  검색 메서드 (find, filter, includes)
                </Anchor>
              </List.Item>
              <List.Item>
                <Anchor href="#reduce">축소 메서드 (reduce)</Anchor>
              </List.Item>
              <List.Item>
                <Anchor href="#check">검사 메서드 (some, every)</Anchor>
              </List.Item>
              <List.Item>
                <Anchor href="#transform">변환 메서드 (flat, flatMap)</Anchor>
              </List.Item>
            </List>
            <List size="sm" spacing="xs">
              <List.Item>
                <Anchor href="#extract">추출/조작 (slice, splice)</Anchor>
              </List.Item>
              <List.Item>
                <Anchor href="#combine">결합 메서드 (concat, join)</Anchor>
              </List.Item>
              <List.Item>
                <Anchor href="#order">정렬 메서드 (sort, reverse)</Anchor>
              </List.Item>
              <List.Item>
                <Anchor href="#stack">
                  스택/큐 (push, pop, shift, unshift)
                </Anchor>
              </List.Item>
              <List.Item>
                <Anchor href="#other">기타 유용한 메서드</Anchor>
              </List.Item>
            </List>
          </Group>
        </Paper>

        {/* ===== 순회 메서드 ===== */}
        <Box id="iteration">
          <Title order={2} mb="md">
            1. 순회 메서드
          </Title>

          <Section
            title="forEach()"
            description="배열의 각 요소에 대해 주어진 함수를 실행합니다. 반환값이 없습니다(undefined)."
            mutates={false}
          >
            <Code block>{`const numbers = [1, 2, 3];

numbers.forEach((num, index) => {
  console.log(\`인덱스 \${index}: \${num}\`);
});
// 출력:
// 인덱스 0: 1
// 인덱스 1: 2
// 인덱스 2: 3

// 반환값은 undefined
const result = numbers.forEach(num => num * 2);
console.log(result); // undefined`}</Code>
            <Alert color="blue" variant="light" mt="sm">
              <Text size="sm">
                <strong>면접 포인트:</strong> forEach는 중간에 break/return으로
                멈출 수 없습니다. 중단이 필요하면 for...of나 some/every를
                사용하세요.
              </Text>
            </Alert>
          </Section>

          <Section
            title="map()"
            description="배열의 모든 요소에 함수를 적용하고, 그 결과로 새로운 배열을 반환합니다."
            mutates={false}
          >
            <Code block>{`const numbers = [1, 2, 3, 4, 5];

// 각 요소를 2배로 만든 새 배열
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
console.log(numbers); // [1, 2, 3, 4, 5] (원본 유지)

// 객체 배열 변환
const users = [
  { name: "Kim", age: 25 },
  { name: "Lee", age: 30 }
];

const names = users.map(user => user.name);
console.log(names); // ["Kim", "Lee"]

// index 활용
const indexed = numbers.map((num, idx) => \`\${idx}: \${num}\`);
console.log(indexed); // ["0: 1", "1: 2", "2: 3", "3: 4", "4: 5"]`}</Code>
            <Alert color="blue" variant="light" mt="sm">
              <Text size="sm">
                <strong>면접 포인트:</strong> map은 항상 원본과 같은 길이의
                배열을 반환합니다. forEach와 달리 반환값이 있어 체이닝이
                가능합니다.
              </Text>
            </Alert>
          </Section>
        </Box>

        {/* ===== 검색 메서드 ===== */}
        <Box id="search">
          <Title order={2} mb="md">
            2. 검색 메서드
          </Title>

          <Section
            title="find()"
            description="조건을 만족하는 첫 번째 요소를 반환합니다. 없으면 undefined를 반환합니다."
            mutates={false}
          >
            <Code block>{`const users = [
  { id: 1, name: "Kim", age: 25 },
  { id: 2, name: "Lee", age: 30 },
  { id: 3, name: "Park", age: 25 }
];

// 나이가 25인 첫 번째 사용자
const user = users.find(u => u.age === 25);
console.log(user); // { id: 1, name: "Kim", age: 25 }

// 존재하지 않는 조건
const notFound = users.find(u => u.age === 40);
console.log(notFound); // undefined`}</Code>
          </Section>

          <Section
            title="findIndex()"
            description="조건을 만족하는 첫 번째 요소의 인덱스를 반환합니다. 없으면 -1을 반환합니다."
            mutates={false}
          >
            <Code block>{`const numbers = [10, 20, 30, 40, 50];

const index = numbers.findIndex(num => num > 25);
console.log(index); // 2 (30의 인덱스)

const notFound = numbers.findIndex(num => num > 100);
console.log(notFound); // -1`}</Code>
          </Section>

          <Section
            title="filter()"
            description="조건을 만족하는 모든 요소로 새로운 배열을 만들어 반환합니다."
            mutates={false}
          >
            <Code block>{`const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 짝수만 필터링
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

// 객체 배열 필터링
const products = [
  { name: "노트북", price: 1500000 },
  { name: "마우스", price: 50000 },
  { name: "키보드", price: 150000 }
];

const expensive = products.filter(p => p.price >= 100000);
console.log(expensive);
// [{ name: "노트북", price: 1500000 }, { name: "키보드", price: 150000 }]

// 빈 배열 반환 (조건 만족하는 요소 없음)
const empty = numbers.filter(num => num > 100);
console.log(empty); // []`}</Code>
            <Alert color="blue" variant="light" mt="sm">
              <Text size="sm">
                <strong>면접 포인트:</strong> find는 하나만 찾고 멈추지만,
                filter는 모든 요소를 검사합니다.
              </Text>
            </Alert>
          </Section>

          <Section
            title="includes()"
            description="배열에 특정 값이 포함되어 있는지 boolean으로 반환합니다."
            mutates={false}
          >
            <Code block>{`const fruits = ["apple", "banana", "orange"];

console.log(fruits.includes("banana")); // true
console.log(fruits.includes("grape"));  // false

// 시작 인덱스 지정
console.log(fruits.includes("apple", 1)); // false (인덱스 1부터 검색)

// NaN 비교 가능 (indexOf와의 차이점!)
const arr = [1, 2, NaN];
console.log(arr.includes(NaN));  // true
console.log(arr.indexOf(NaN));   // -1 (indexOf는 NaN을 찾지 못함)`}</Code>
          </Section>

          <Section
            title="indexOf() / lastIndexOf()"
            description="특정 값의 인덱스를 반환합니다. 없으면 -1을 반환합니다."
            mutates={false}
          >
            <Code block>{`const letters = ["a", "b", "c", "b", "d"];

// 첫 번째 발견 인덱스
console.log(letters.indexOf("b"));     // 1

// 마지막 발견 인덱스
console.log(letters.lastIndexOf("b")); // 3

// 없는 값
console.log(letters.indexOf("z"));     // -1

// 시작 위치 지정
console.log(letters.indexOf("b", 2));  // 3 (인덱스 2부터 검색)`}</Code>
          </Section>
        </Box>

        {/* ===== 축소 메서드 ===== */}
        <Box id="reduce">
          <Title order={2} mb="md">
            3. 축소 메서드
          </Title>

          <Section
            title="reduce()"
            description="배열을 순회하며 누적값을 계산하여 하나의 결과값을 반환합니다."
            mutates={false}
          >
            <Code block>{`// 기본 구조: array.reduce((누적값, 현재값, 인덱스, 배열) => 계산, 초기값)

const numbers = [1, 2, 3, 4, 5];

// 합계 구하기
const sum = numbers.reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 15

// 최댓값 구하기
const max = numbers.reduce((acc, cur) => (cur > acc ? cur : acc), numbers[0]);
console.log(max); // 5

// 배열을 객체로 변환
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
console.log(count); // { apple: 3, banana: 2, orange: 1 }

// 중첩 배열 평탄화 (flat 대신)
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.reduce((acc, cur) => acc.concat(cur), [] as number[]);
console.log(flat); // [1, 2, 3, 4, 5]

// 파이프라인 패턴
const pipeline = [
  (x: number) => x + 1,
  (x: number) => x * 2,
  (x: number) => x - 3
];
const result = pipeline.reduce((acc, fn) => fn(acc), 5);
console.log(result); // ((5 + 1) * 2) - 3 = 9`}</Code>
            <Alert color="blue" variant="light" mt="sm">
              <Text size="sm">
                <strong>면접 포인트:</strong> 초기값을 생략하면 첫 번째 요소가
                초기값이 됩니다. 빈 배열에서 초기값 없이 reduce를 호출하면
                에러가 발생합니다.
              </Text>
            </Alert>
          </Section>

          <Section
            title="reduceRight()"
            description="reduce와 동일하지만 배열의 끝에서부터 시작합니다."
            mutates={false}
          >
            <Code block>{`const numbers = [1, 2, 3, 4];

// 오른쪽에서 왼쪽으로 연결
const result = numbers.reduceRight((acc, cur) => acc + cur.toString(), "");
console.log(result); // "4321"

// 함수 합성 (compose 패턴)
const compose = (...fns: Function[]) =>
  (x: any) => fns.reduceRight((acc, fn) => fn(acc), x);

const add10 = (x: number) => x + 10;
const multiply2 = (x: number) => x * 2;

const composed = compose(add10, multiply2); // multiply2 먼저, add10 나중
console.log(composed(5)); // (5 * 2) + 10 = 20`}</Code>
          </Section>
        </Box>

        {/* ===== 검사 메서드 ===== */}
        <Box id="check">
          <Title order={2} mb="md">
            4. 검사 메서드
          </Title>

          <Section
            title="some()"
            description="배열 요소 중 하나라도 조건을 만족하면 true를 반환합니다."
            mutates={false}
          >
            <Code block>{`const numbers = [1, 2, 3, 4, 5];

// 짝수가 하나라도 있는지?
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

// 10보다 큰 수가 있는지?
const hasLarge = numbers.some(num => num > 10);
console.log(hasLarge); // false

// 조건 만족하면 즉시 멈춤 (성능 이점)
const arr = [1, 2, 3, 4, 5];
arr.some((num, idx) => {
  console.log(\`검사 중: \${idx}\`);
  return num === 2;
});
// 출력:
// 검사 중: 0
// 검사 중: 1
// (2에서 true 반환 후 멈춤)`}</Code>
          </Section>

          <Section
            title="every()"
            description="배열의 모든 요소가 조건을 만족하면 true를 반환합니다."
            mutates={false}
          >
            <Code block>{`const numbers = [2, 4, 6, 8, 10];

// 모두 짝수인지?
const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven); // true

// 모두 양수인지?
const mixed = [1, -2, 3, -4];
const allPositive = mixed.every(num => num > 0);
console.log(allPositive); // false

// 빈 배열은 항상 true (vacuous truth)
const empty: number[] = [];
console.log(empty.every(num => num > 100)); // true`}</Code>
            <Alert color="blue" variant="light" mt="sm">
              <Text size="sm">
                <strong>면접 포인트:</strong> some은 OR 연산, every는 AND
                연산으로 생각하면 됩니다. 빈 배열에서 some()은 false, every()는
                true를 반환합니다.
              </Text>
            </Alert>
          </Section>
        </Box>

        {/* ===== 변환 메서드 ===== */}
        <Box id="transform">
          <Title order={2} mb="md">
            5. 변환 메서드
          </Title>

          <Section
            title="flat()"
            description="중첩된 배열을 지정한 깊이까지 평탄화합니다. 기본 깊이는 1입니다."
            mutates={false}
          >
            <Code block>{`const nested = [1, [2, 3], [4, [5, 6]]];

// 깊이 1 (기본값)
console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]]

// 깊이 2
console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6]

// 무한 깊이
const deepNested = [1, [2, [3, [4, [5]]]]];
console.log(deepNested.flat(Infinity)); // [1, 2, 3, 4, 5]

// 빈 슬롯 제거
const sparse = [1, , 3, , 5];
console.log(sparse.flat()); // [1, 3, 5]`}</Code>
          </Section>

          <Section
            title="flatMap()"
            description="map()과 flat(1)을 합친 메서드입니다. 각 요소를 변환하고 결과를 1단계 평탄화합니다."
            mutates={false}
          >
            <Code block>{`const sentences = ["Hello World", "Good Morning"];

// map + flat(1) 과 동일
const words = sentences.flatMap(s => s.split(" "));
console.log(words); // ["Hello", "World", "Good", "Morning"]

// 조건부 확장
const numbers = [1, 2, 3];
const expanded = numbers.flatMap(n => n === 2 ? [n, n * 10] : [n]);
console.log(expanded); // [1, 2, 20, 3]

// 필터링과 변환 동시에
const mixed = [1, "two", 3, "four", 5];
const doubled = mixed.flatMap(x =>
  typeof x === "number" ? [x * 2] : []
);
console.log(doubled); // [2, 6, 10]`}</Code>
          </Section>
        </Box>

        {/* ===== 추출/조작 ===== */}
        <Box id="extract">
          <Title order={2} mb="md">
            6. 추출/조작 메서드
          </Title>

          <Section
            title="slice()"
            description="배열의 일부를 추출하여 새 배열로 반환합니다. 원본은 변경되지 않습니다."
            mutates={false}
          >
            <Code block>{`const arr = [0, 1, 2, 3, 4, 5];

// slice(시작, 끝) - 끝 인덱스는 미포함
console.log(arr.slice(1, 4));  // [1, 2, 3]
console.log(arr.slice(2));     // [2, 3, 4, 5] (끝까지)
console.log(arr.slice(-2));    // [4, 5] (뒤에서 2개)
console.log(arr.slice(1, -1)); // [1, 2, 3, 4] (처음~끝-1)
console.log(arr.slice());      // [0, 1, 2, 3, 4, 5] (얕은 복사)

// 원본 유지
console.log(arr); // [0, 1, 2, 3, 4, 5]`}</Code>
          </Section>

          <Section
            title="splice()"
            description="배열의 요소를 삭제, 교체, 추가합니다. 원본 배열이 변경됩니다."
            mutates={true}
          >
            <Code block>{`// splice(시작인덱스, 삭제할개수, ...추가할요소들)

// 삭제
const arr1 = [0, 1, 2, 3, 4];
const removed = arr1.splice(2, 2); // 인덱스 2부터 2개 삭제
console.log(removed); // [2, 3] (삭제된 요소들)
console.log(arr1);    // [0, 1, 4]

// 교체
const arr2 = [0, 1, 2, 3, 4];
arr2.splice(1, 2, "a", "b", "c"); // 인덱스 1부터 2개 삭제 후 삽입
console.log(arr2); // [0, "a", "b", "c", 3, 4]

// 삽입 (삭제 없이)
const arr3 = [0, 1, 2];
arr3.splice(1, 0, "inserted"); // 인덱스 1 위치에 삽입
console.log(arr3); // [0, "inserted", 1, 2]

// 음수 인덱스
const arr4 = [0, 1, 2, 3, 4];
arr4.splice(-2, 1); // 뒤에서 2번째부터 1개 삭제
console.log(arr4); // [0, 1, 2, 4]`}</Code>
            <Alert color="red" variant="light" mt="sm">
              <Text size="sm">
                <strong>주의:</strong> slice와 splice는 이름이 비슷하지만 완전히
                다릅니다! slice는 원본을 유지하고, splice는 원본을 변경합니다.
              </Text>
            </Alert>
          </Section>
        </Box>

        {/* ===== 결합 메서드 ===== */}
        <Box id="combine">
          <Title order={2} mb="md">
            7. 결합 메서드
          </Title>

          <Section
            title="concat()"
            description="배열을 다른 배열이나 값과 합쳐 새로운 배열을 반환합니다."
            mutates={false}
          >
            <Code block>{`const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

// 배열 합치기
const merged = arr1.concat(arr2);
console.log(merged); // [1, 2, 3, 4]

// 여러 배열 합치기
const all = arr1.concat(arr2, arr3);
console.log(all); // [1, 2, 3, 4, 5, 6]

// 값 추가
const withValues = arr1.concat(3, 4, 5);
console.log(withValues); // [1, 2, 3, 4, 5]

// 스프레드 연산자와 비교
const spread = [...arr1, ...arr2, ...arr3];
console.log(spread); // [1, 2, 3, 4, 5, 6]`}</Code>
          </Section>

          <Section
            title="join()"
            description="배열의 모든 요소를 문자열로 연결합니다."
            mutates={false}
          >
            <Code block>{`const words = ["Hello", "World", "JavaScript"];

console.log(words.join());      // "Hello,World,JavaScript" (기본: 쉼표)
console.log(words.join(" "));   // "Hello World JavaScript"
console.log(words.join("-"));   // "Hello-World-JavaScript"
console.log(words.join(""));    // "HelloWorldJavaScript"

// 숫자 배열
const numbers = [2024, 1, 15];
console.log(numbers.join("/")); // "2024/1/15"

// undefined, null은 빈 문자열로 처리
const mixed = [1, undefined, 3, null, 5];
console.log(mixed.join("-")); // "1--3--5"`}</Code>
          </Section>
        </Box>

        {/* ===== 정렬 메서드 ===== */}
        <Box id="order">
          <Title order={2} mb="md">
            8. 정렬 메서드
          </Title>

          <Section
            title="sort()"
            description="배열을 정렬합니다. 기본적으로 문자열 유니코드 순서로 정렬됩니다."
            mutates={true}
          >
            <Code block>{`// 문자열 정렬 (기본)
const fruits = ["banana", "apple", "cherry"];
fruits.sort();
console.log(fruits); // ["apple", "banana", "cherry"]

// 숫자 정렬 주의! (문자열로 변환 후 비교)
const numbers = [10, 2, 30, 4];
numbers.sort();
console.log(numbers); // [10, 2, 30, 4] → 문자열 비교!

// 숫자 오름차순
const nums1 = [10, 2, 30, 4];
nums1.sort((a, b) => a - b);
console.log(nums1); // [2, 4, 10, 30]

// 숫자 내림차순
const nums2 = [10, 2, 30, 4];
nums2.sort((a, b) => b - a);
console.log(nums2); // [30, 10, 4, 2]

// 객체 배열 정렬
const users = [
  { name: "Kim", age: 30 },
  { name: "Lee", age: 25 },
  { name: "Park", age: 35 }
];

// 나이순 정렬
users.sort((a, b) => a.age - b.age);
console.log(users);
// [{ name: "Lee", age: 25 }, { name: "Kim", age: 30 }, { name: "Park", age: 35 }]

// 이름순 정렬 (문자열)
users.sort((a, b) => a.name.localeCompare(b.name));`}</Code>
            <Alert color="blue" variant="light" mt="sm">
              <Text size="sm">
                <strong>면접 포인트:</strong> sort()는 원본을 변경합니다. 원본
                유지가 필요하면 <Code>[...arr].sort()</Code> 또는{" "}
                <Code>arr.toSorted()</Code>(ES2023)를 사용하세요.
              </Text>
            </Alert>
          </Section>

          <Section
            title="reverse()"
            description="배열의 순서를 뒤집습니다."
            mutates={true}
          >
            <Code block>{`const arr = [1, 2, 3, 4, 5];

arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]

// 문자열 뒤집기
const str = "Hello";
const reversed = str.split("").reverse().join("");
console.log(reversed); // "olleH"

// 원본 유지하려면
const original = [1, 2, 3];
const reversedCopy = [...original].reverse();
console.log(original);     // [1, 2, 3]
console.log(reversedCopy); // [3, 2, 1]`}</Code>
          </Section>
        </Box>

        {/* ===== 스택/큐 ===== */}
        <Box id="stack">
          <Title order={2} mb="md">
            9. 스택/큐 메서드
          </Title>

          <Section
            title="push() / pop()"
            description="배열의 끝에 요소를 추가(push)하거나 제거(pop)합니다."
            mutates={true}
          >
            <Code block>{`const stack = [1, 2, 3];

// push: 끝에 추가, 새 길이 반환
const newLength = stack.push(4, 5);
console.log(stack);     // [1, 2, 3, 4, 5]
console.log(newLength); // 5

// pop: 끝에서 제거, 제거된 요소 반환
const removed = stack.pop();
console.log(stack);   // [1, 2, 3, 4]
console.log(removed); // 5

// 빈 배열에서 pop
const empty: number[] = [];
console.log(empty.pop()); // undefined`}</Code>
          </Section>

          <Section
            title="unshift() / shift()"
            description="배열의 앞에 요소를 추가(unshift)하거나 제거(shift)합니다."
            mutates={true}
          >
            <Code block>{`const queue = [2, 3, 4];

// unshift: 앞에 추가, 새 길이 반환
const newLength = queue.unshift(0, 1);
console.log(queue);     // [0, 1, 2, 3, 4]
console.log(newLength); // 5

// shift: 앞에서 제거, 제거된 요소 반환
const removed = queue.shift();
console.log(queue);   // [1, 2, 3, 4]
console.log(removed); // 0`}</Code>
            <Alert color="orange" variant="light" mt="sm">
              <Text size="sm">
                <strong>성능 참고:</strong> push/pop은 O(1)이지만,
                shift/unshift는 O(n)입니다. 모든 요소의 인덱스를 재조정해야 하기
                때문입니다.
              </Text>
            </Alert>
          </Section>
        </Box>

        {/* ===== 기타 메서드 ===== */}
        <Box id="other">
          <Title order={2} mb="md">
            10. 기타 유용한 메서드
          </Title>

          <Section
            title="fill()"
            description="배열의 모든 요소를 지정한 값으로 채웁니다."
            mutates={true}
          >
            <Code block>{`const arr = [1, 2, 3, 4, 5];

// 전체 채우기
arr.fill(0);
console.log(arr); // [0, 0, 0, 0, 0]

// 범위 지정: fill(값, 시작, 끝)
const arr2 = [1, 2, 3, 4, 5];
arr2.fill(0, 1, 4);
console.log(arr2); // [1, 0, 0, 0, 5]

// 배열 초기화에 활용
const zeros = new Array(5).fill(0);
console.log(zeros); // [0, 0, 0, 0, 0]

// 주의: 객체 참조
const refs = new Array(3).fill({ a: 1 });
refs[0].a = 999;
console.log(refs); // [{ a: 999 }, { a: 999 }, { a: 999 }] - 같은 객체 참조!

// 올바른 객체 배열 생성
const objects = Array.from({ length: 3 }, () => ({ a: 1 }));
objects[0].a = 999;
console.log(objects); // [{ a: 999 }, { a: 1 }, { a: 1 }]`}</Code>
          </Section>

          <Section
            title="Array.from()"
            description="유사 배열 객체나 이터러블을 배열로 변환합니다."
            mutates={false}
          >
            <Code block>{`// 문자열 → 배열
const chars = Array.from("Hello");
console.log(chars); // ["H", "e", "l", "l", "o"]

// Set → 배열
const set = new Set([1, 2, 2, 3]);
const arr = Array.from(set);
console.log(arr); // [1, 2, 3]

// 길이 지정 배열 생성
const nums = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(nums); // [1, 2, 3, 4, 5]

// NodeList → 배열
// const divs = Array.from(document.querySelectorAll("div"));

// 2차원 배열 생성
const matrix = Array.from({ length: 3 }, () =>
  Array.from({ length: 3 }, () => 0)
);
console.log(matrix);
// [[0, 0, 0], [0, 0, 0], [0, 0, 0]]`}</Code>
          </Section>

          <Section
            title="Array.isArray()"
            description="주어진 값이 배열인지 확인합니다."
            mutates={false}
          >
            <Code block>{`console.log(Array.isArray([1, 2, 3]));     // true
console.log(Array.isArray("string"));      // false
console.log(Array.isArray({ length: 3 })); // false (유사 배열)
console.log(Array.isArray(new Array(3)));  // true

// typeof와 비교
console.log(typeof [1, 2, 3]); // "object" (배열도 객체!)
console.log(typeof null);      // "object" (JavaScript 버그)

// instanceof와의 차이
const arr = [1, 2, 3];
console.log(arr instanceof Array);  // true
console.log(Array.isArray(arr));    // true
// iframe의 배열은 instanceof가 실패할 수 있음
// Array.isArray()가 더 안전함`}</Code>
          </Section>

          <Section
            title="at()"
            description="지정한 인덱스의 요소를 반환합니다. 음수 인덱스를 지원합니다."
            mutates={false}
          >
            <Code block>{`const arr = ["a", "b", "c", "d", "e"];

// 일반 인덱스
console.log(arr.at(0));   // "a"
console.log(arr.at(2));   // "c"

// 음수 인덱스 (뒤에서부터)
console.log(arr.at(-1));  // "e" (마지막)
console.log(arr.at(-2));  // "d"

// 기존 방식과 비교
console.log(arr[arr.length - 1]); // "e"
console.log(arr.at(-1));          // "e" (더 깔끔!)

// 범위 초과
console.log(arr.at(100)); // undefined`}</Code>
          </Section>

          <Section
            title="toSorted() / toReversed() / toSpliced() (ES2023)"
            description="원본을 변경하지 않는 새로운 배열 메서드들입니다."
            mutates={false}
          >
            <Code block>{`const original = [3, 1, 4, 1, 5];

// toSorted: sort의 비파괴 버전
const sorted = original.toSorted((a, b) => a - b);
console.log(sorted);   // [1, 1, 3, 4, 5]
console.log(original); // [3, 1, 4, 1, 5] (원본 유지!)

// toReversed: reverse의 비파괴 버전
const reversed = original.toReversed();
console.log(reversed); // [5, 1, 4, 1, 3]
console.log(original); // [3, 1, 4, 1, 5]

// toSpliced: splice의 비파괴 버전
const spliced = original.toSpliced(1, 2, 9, 9);
console.log(spliced);  // [3, 9, 9, 1, 5]
console.log(original); // [3, 1, 4, 1, 5]

// with: 특정 인덱스 값 교체 (비파괴)
const changed = original.with(2, 100);
console.log(changed);  // [3, 1, 100, 1, 5]
console.log(original); // [3, 1, 4, 1, 5]`}</Code>
            <Alert color="green" variant="light" mt="sm">
              <Text size="sm">
                <strong>추천:</strong> ES2023의 새 메서드들은 불변성을 유지하므로
                React 등 상태 관리에서 특히 유용합니다!
              </Text>
            </Alert>
          </Section>
        </Box>

        {/* ===== 비교표 ===== */}
        <Box>
          <Title order={2} mb="md">
            메서드 비교 요약표
          </Title>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>메서드</Table.Th>
                <Table.Th>반환값</Table.Th>
                <Table.Th>원본 변경</Table.Th>
                <Table.Th>용도</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {tableData.map(([method, returns, mutates, usage], i) => (
                <Table.Tr key={i}>
                  <Table.Td>
                    <Code>{method}</Code>
                  </Table.Td>
                  <Table.Td>{returns}</Table.Td>
                  <Table.Td>
                    <Badge
                      color={mutates === "O" ? "red" : "green"}
                      variant="light"
                    >
                      {mutates}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{usage}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>

        {/* ===== 면접 팁 ===== */}
        <Alert color="yellow" title="면접 핵심 포인트" variant="light">
          <List type="ordered" spacing="sm">
            <List.Item>
              <strong>map vs forEach 차이점?</strong>
              <br />→ map은 새 배열 반환, forEach는 undefined 반환. map은 체이닝
              가능.
            </List.Item>
            <List.Item>
              <strong>slice vs splice 차이점?</strong>
              <br />→ slice는 원본 유지 + 부분 추출, splice는 원본 변경 +
              삭제/삽입.
            </List.Item>
            <List.Item>
              <strong>find vs filter 차이점?</strong>
              <br />→ find는 첫 번째 요소 하나만, filter는 조건 만족하는 모든
              요소.
            </List.Item>
            <List.Item>
              <strong>some vs every 차이점?</strong>
              <br />→ some은 하나라도 true면 true (OR), every는 모두 true여야
              true (AND).
            </List.Item>
            <List.Item>
              <strong>reduce로 map, filter 구현할 수 있나요?</strong>
              <br />→ 네! reduce는 가장 강력한 메서드로 다른 메서드들을 모두 구현
              가능.
            </List.Item>
          </List>
        </Alert>

        <Code block>{`// reduce로 map 구현
const myMap = <T, U>(arr: T[], fn: (item: T) => U): U[] =>
  arr.reduce((acc, cur) => [...acc, fn(cur)], [] as U[]);

// reduce로 filter 구현
const myFilter = <T>(arr: T[], fn: (item: T) => boolean): T[] =>
  arr.reduce((acc, cur) => (fn(cur) ? [...acc, cur] : acc), [] as T[]);

// 테스트
console.log(myMap([1, 2, 3], x => x * 2));        // [2, 4, 6]
console.log(myFilter([1, 2, 3, 4], x => x > 2));  // [3, 4]`}</Code>

        <Text ta="center" c="dimmed" mt="xl">
          이 페이지가 JavaScript 배열 메서드 학습에 도움이 되길 바랍니다!
        </Text>
      </Stack>
    </Container>
  );
};

export default ArrayMethodsPage;
