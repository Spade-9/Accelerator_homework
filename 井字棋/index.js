// 创建棋子
let player = 'X';
let computer = 'X';

let result = '';

let i = 0;// 用于平局判断
let num = 0;// mode设置
let cnt = 0;// 轮次计数
let draw = 0;// 记录平局次数
let win = [];// 存储每轮的胜负情况

// 获取按钮
const options = document.querySelector('.options');
const start = document.querySelector('.start');
const showResult = document.querySelector('.showResult');
const game = document.querySelector('.game');
const squares = document.querySelectorAll('.square');
const end = document.querySelector('.end');
const caption = document.querySelector('.result');
const replay = document.querySelector('.replay');
const withdraw = document.querySelector('.withdraw');

const mode = document.querySelector('.mode');
const modes = document.querySelector('.mode-select');




// 1.模式选择界面
function modeSelect() {
    modes.addEventListener('click', (e) => {
        mode.classList.add('hide')
        // 设置模式
        num = e.target.classList.value.split('').pop();
        // 显示开始界面
        setTimeout(() => {
            start.classList.remove('hide')
            Start();
        }, 100);
    });
};


// 2. 开始界面
function Start() {
    options.addEventListener('click', (e) => {
        // 隐藏开始界面
        start.classList.add('hide');
        // 设置棋子
        player = e.target.classList.value;
        if (player === 'X') computer = 'O';
        else computer = 'X';
        // 显示游戏页面
        setTimeout(() => {
            game.classList.remove('hide');
        }, 100);
    });
};



// 3. 游戏界面
// 存储还未点击的棋格
let Board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
// 获取游戏棋盘
const board = document.querySelector('table');
// 设置标志，表示游戏是否结束
// console.log(board)
// 玩家点击函数
function playerClick() {
    board.addEventListener('click', (e) => {
        // console.log();
        // 若玩家已经选中某个棋格，则不能再选中
        if (e.target.tagName === 'TD') {
            // console.log(e.target.id);
            e.target.style.pointerEvents = 'none';
            e.target.innerHTML = player;
            Board[e.target.id] = player;
            console.log(Board);
            // 用户成功选择后，电脑开始选择
            i += 2;
            if (i > 8) {
                result = 'A DRAW';
                Over();
            }
            else {
                if (judge()) {
                    bot();
                    if (judge() == 0) {
                        result = 'YOU LOSE';
                        Over();
                    }
                } else {
                    result = 'YOU WIN';
                    Over();
                }
            }
        }
    });
};

// 电脑点击函数
function bot() {
    let random = parseInt(Math.random() * 9);
    while (Board[random] !== 0) {
        random = parseInt(Math.random() * 9);
    }
    Board[random] = computer;
    const tmp = document.getElementById(`${random}`);
    tmp.innerHTML = computer;
    tmp.style.pointerEvents = 'none';
}

// 判断是否有winner，有则返回0，表示游戏应该结束；没有，则返回1
function judge() {
    // 判断行
    for (let i = 0; i < Board.length; i += 3) {
        if (Board[i] && Board[i] == Board[i + 1] && Board[i] == Board[i + 2])
            return 0;
    }
    // 判断列
    for (let i = 0; i < 3; i++) {
        if (Board[i] && Board[i] == Board[i + 3] && Board[i] == Board[i + 6])
            return 0;
    }
    // 判断对角线
    if (Board[0] && Board[0] == Board[4] && Board[0] == Board[8])
        return 0;
    if (Board[2] && Board[2] == Board[4] && Board[2] == Board[6])
        return 0;
    return 1;
}

// 一轮游戏结束
function Over() {
    console.log(result);
    cnt++;
    console.log(cnt);
    game.style.pointerEvents = 'none';
    // 记录本局对决结果
    if (result === 'YOU LOSE')
        win.push(0);
    else if (result === 'YOU WIN')
        win.push(1)
    else
        draw++;
    console.log(win);
    // 如果还没有到最后轮次
    if (cnt < num) {
        setTimeout(() => {
            game.style.removeProperty('pointer-events');
            game.classList.add('hide');
            restart();
        }, 2000);
    }
    // 如果到了最后轮次
    else {
        result = Rusult();
        setTimeout(() => {
            game.style.removeProperty('pointer-events');
            game.classList.add('hide');
            caption.innerHTML = result;
            end.classList.remove('hide');
            select();
        }, 2000);
    }

}

// 计算最终结果的函数
function Rusult() {
    let sum = 0;
    for (let j = 0; j < win.length; j++) {
        sum += win[j];
    }
    num -= draw;
    sum *= 2;
    console.log(sum, num)
    if (sum > num)
        return 'FINAL:YOU WIN';
    else if (sum === num)
        return 'FINAL:A DRAW';
    else
        return 'FINAL:YOU LOSE';
}

// 恢复棋盘等
function recover() {
    // 恢复棋盘
    for (let i = 0; i < squares.length; i++) {
        const element = squares[i];
        element.style.removeProperty('pointer-events');
        element.innerHTML = '';
    }
    // 恢复Board数组
    Board = Board.fill(0);
    // 恢复i
    i = 0;
}

// 重新开始新的一局
function restart() {
    recover();
    showResult.innerHTML = result;
    console.log(showResult);
    // 回到开始界面
    setTimeout(() => {
        start.classList.remove('hide');
    }, 100);
    Start();
}

//重新开始整个游戏
function Restart() {
    recover();
    [num, cnt, draw] = [0, 0, 0];
    win = win.fill(0);
    showResult.innerHTML = 'Make Your Choice!';
    // 回到模式选择界面
    end.classList.add('hide');
    setTimeout(() => {
        mode.classList.remove('hide');
    }, 100);
    modeSelect();
}

// 结束后选择
function select() {
    withdraw.addEventListener('click', () => {
        window.close();
    });
    replay.addEventListener('click', () => {
        Restart();
    });
}

// 开始游戏
modeSelect();
playerClick();
