import { Module, Badge } from './types';

export const MODULES: Module[] = [
  {
    id: 'variables',
    number: '01',
    title: 'Variables & Data Types',
    icon: 'Database',
    mastery: 65,
    level: 4,
    locked: false,
    content: {
      sections: [
        {
          id: 'what-are-variables',
          number: '01',
          title: 'WHAT_ARE_VARIABLES?',
          body: `A **Variable** is a named container for storing data values. Think of it as a labeled box in your system's memory that holds information you can use, modify, and reference later.

When you define a variable, you are telling the computer: "Hey, reserve some space for this specific piece of data and call it **X**."`,
          codeExample: `player_score = 0 
# The system labels a memory slot 'player_score' and stores 0

player_score = player_score + 10 
# The value in the slot is now updated to 10`
        },
        {
          id: 'data-types',
          number: '02',
          title: 'CORE_DATA_TYPES',
          body: `Every piece of data has a specific **Type**. The computer needs to know what kind of data it's handling so it knows what operations it can perform.

1. **Strings**: Textual data wrapped in quotes (e.g., \`"Hello"\`).
2. **Integers**: Whole numbers (e.g., \`42\`).
3. **Floats**: Decimal numbers (e.g., \`3.14\`).
4. **Booleans**: Logical states (\`True\` or \`False\`).`,
          codeExample: `name = "Ada"       # String
age = 25           # Integer
pi = 3.14          # Float
is_online = True   # Boolean`
        }
      ],
      challenges: [
        {
          id: 'v1',
          level: 'LEVEL_01',
          title: 'VARIABLE_INITIALIZATION',
          task: `Create a variable named \`systemID\` and assign it the string value \`"ARCH_ALPHA"\`. Then, create a second variable \`coreCount\` and assign it the number \`16\`.`,
          xp: 200,
          validation: (globals) => globals.get('systemID') === 'ARCH_ALPHA' && globals.get('coreCount') === 16
        },
        {
          id: 'v2',
          level: 'LEVEL_02',
          title: 'FLOATING_POINT_LOGIC',
          task: `Define a variable \`cpu_temp\` and set it to \`38.5\`. Then define \`critical_temp\` and set it to \`85.0\`.`,
          xp: 200,
          validation: (globals) => globals.get('cpu_temp') === 38.5 && globals.get('critical_temp') === 85.0
        },
        {
          id: 'v3',
          level: 'LEVEL_03',
          title: 'BOOLEAN_STATUS_CHECK',
          task: `Create a variable \`is_active\` and set it to \`True\`. Also set \`has_errors\` to \`False\`.`,
          xp: 200,
          validation: (globals) => globals.get('is_active') === true && globals.get('has_errors') === false
        },
        {
          id: 'v4',
          level: 'LEVEL_04',
          title: 'STRING_CONCATENATION',
          task: `Create two variables: \`prefix\` with value \`"SYSTEM_"\` and \`suffix\` with value \`"ACTIVE"\`. Then create a third variable \`final_status\` that combines them to form \`"SYSTEM_ACTIVE"\`.`,
          xp: 200,
          validation: (globals) => {
            const p = globals.get('prefix');
            const s = globals.get('suffix');
            const f = globals.get('final_status');
            return p === 'SYSTEM_' && s === 'ACTIVE' && f === 'SYSTEM_ACTIVE';
          }
        },
        {
          id: 'v5',
          level: 'LEVEL_05',
          title: 'DYNAMIC_REASSIGNMENT',
          task: `Assign the value \`100\` to a variable named \`buffer\`. On the next line, update \`buffer\` to be \`buffer + 50\`.`,
          xp: 300,
          validation: (globals) => globals.get('buffer') === 150
        }
      ]
    }
  },
  {
    id: 'conditionals',
    number: '02',
    title: 'Conditionals (if/else)',
    icon: 'Split',
    mastery: 0,
    level: 6,
    locked: true,
    content: {
      sections: [
        {
          id: 'decision-making',
          number: '01',
          title: 'LOGICAL_BRANCHING',
          body: `**Conditionals** allow your code to make decisions based on certain criteria. 

The \`if\` statement evaluates a condition. If the condition is \`True\`, the code block inside is executed. Use \`else\` to provide a fallback if the condition is \`False\`.`,
          codeExample: `power_level = 9001

if power_level > 9000:
    print("It's over nine thousand!")
else:
    print("Normal reading.")`
        },
        {
          id: 'elif-logic',
          number: '02',
          title: 'MULTI_STAGE_ELIF',
          body: `When you have more than two paths, use \`elif\` (else if). It allows you to check multiple conditions.

The system stops at the first condition that evaluates to \`True\`.`,
          codeExample: `status = "WARNING"

if status == "CRITICAL":
    alarm = True
elif status == "WARNING":
    alarm = False
    print("Manual check required.")
else:
    print("System stable.")`
        }
      ],
      challenges: [
        {
          id: 'c1',
          level: 'LEVEL_01',
          title: 'SHIELD_REACTIVE_INIT',
          task: `Define \`shield_strength\` as \`75\`. Then write an \`if\` statement that sets \`shield_active\` to \`True\` if \`shield_strength\` is greater than \`50\`.`,
          xp: 200,
          validation: (globals) => globals.get('shield_strength') === 75 && globals.get('shield_active') === true
        },
        {
          id: 'c2',
          level: 'LEVEL_02',
          title: 'PROTOCOL_FALLBACK',
          task: `Define \`auth_key\` as \`"GUEST"\`. Write an \`if/else\` block: if \`auth_key\` is \`"ADMIN"\`, set \`access_level\` to \`10\`. Otherwise, set it to \`1\`.`,
          xp: 200,
          validation: (globals) => globals.get('auth_key') === 'GUEST' && globals.get('access_level') === 1
        },
        {
          id: 'c3',
          level: 'LEVEL_03',
          title: 'INTEGRITY_SCAN',
          task: `Set \`system_integrity\` to \`0.92\`. If \`system_integrity\` is at least (\`>=\`) \`0.90\`, set \`status\` to \`"STABLE"\`. Otherwise set it to \`"DEGRADED"\`.`,
          xp: 200,
          validation: (globals) => globals.get('system_integrity') === 0.92 && globals.get('status') === 'STABLE'
        },
        {
          id: 'c4',
          level: 'LEVEL_04',
          title: 'MULTI_AUTH_GATE',
          task: `Set \`is_connected\` to \`True\` and \`is_verified\` to \`True\`. Use an \`if\` statement with \`and\` to set \`uplink_speed\` to \`1000\` only if both conditions are met.`,
          xp: 200,
          validation: (globals) => globals.get('is_connected') === true && globals.get('is_verified') === true && globals.get('uplink_speed') === 1000
        },
        {
          id: 'c5',
          level: 'LEVEL_05',
          title: 'REACTOR_LEVEL_THROTTLE',
          task: `Set \`reactor_load\` to \`85\`. Use \`if/elif/else\`: if load is \`> 90\`, set \`mode\` to \`"EMERGENCY"\`. elif load is \`> 80\`, set \`mode\` to \`"HIGH"\`. Otherwise set \`mode\` to \`"NORMAL"\`.`,
          xp: 300,
          validation: (globals) => globals.get('reactor_load') === 85 && globals.get('mode') === 'HIGH'
        }
      ]
    }
  },
  {
    id: 'loops',
    number: '03',
    title: 'Loops (for/while)',
    icon: 'RotateCw',
    mastery: 0,
    level: 8,
    locked: true,
    content: {
      sections: [
        {
          id: 'iteration',
          number: '01',
          title: 'ITERATION_PROTOCOLS',
          body: `**Loops** are used to repeat a block of code multiple times. A \`for\` loop is typically used when you know how many times you want to run the code, and it iterates over a sequence like a range of numbers.`,
          codeExample: `for i in range(5):
    print(f"Cycle: {i}")`
        },
        {
          id: 'while-loops',
          number: '02',
          title: 'CONDITIONAL_CYCLES',
          body: `A \`while\` loop repeats as long as a certain condition remains \`True\`. It is ideal for situations where you don't know the exact number of iterations.`,
          codeExample: `energy = 10
while energy > 0:
    energy -= 1
    print("Draining...")`
        }
      ],
      challenges: [
        {
          id: 'l1',
          level: 'LEVEL_01',
          title: 'RANGE_ITERATOR',
          task: `Set \`total\` to \`0\`. Use a \`for\` loop with \`range(5)\` to add each number (0 to 4) to \`total\`.`,
          xp: 200,
          validation: (globals) => globals.get('total') === 10
        },
        {
          id: 'l2',
          level: 'LEVEL_02',
          title: 'WHILE_DRAIN_SEQUENCE',
          task: `Set \`battery\` to \`5\`. Use a \`while\` loop to subtract \`1\` from \`battery\` until it reaches \`0\`.`,
          xp: 200,
          validation: (globals) => globals.get('battery') === 0
        },
        {
          id: 'l3',
          level: 'LEVEL_03',
          title: 'LIST_POPULATION',
          task: `Initialize an empty list \`data = []\`. Use a \`for\` loop to append the numbers \`10, 20, 30\` to it using \`range(10, 40, 10)\`.`,
          xp: 200,
          validation: (globals) => {
            const d = globals.get('data');
            return Array.isArray(d) && d.length === 3 && d[0] === 10 && d[2] === 30;
          }
        },
        {
          id: 'l4',
          level: 'LEVEL_04',
          title: 'BREAK_PROTOCOL',
          task: `Set \`stop_at\` to \`0\`. Loop \`i\` through \`range(10)\`. Inside, if \`i == 4\`, set \`stop_at = i\` and \`break\` the loop.`,
          xp: 200,
          validation: (globals) => globals.get('stop_at') === 4
        },
        {
          id: 'l5',
          level: 'LEVEL_05',
          title: 'ACCUMULATOR_LOGIC',
          task: `Set \`sum_even\` to \`0\`. Loop \`i\` through \`range(10)\`. If \`i\` is even ( \`i % 2 == 0\` ), add \`i\` to \`sum_even\`.`,
          xp: 300,
          validation: (globals) => globals.get('sum_even') === 20
        }
      ]
    }
  },
  {
    id: 'functions',
    number: '04',
    title: 'Functions',
    icon: 'Sigma',
    mastery: 0,
    level: 12,
    locked: true,
    content: {
      sections: [
        {
          id: 'subroutines',
          number: '01',
          title: 'SUBROUTINE_DECLARATION',
          body: `**Functions** are reusable blocks of code that perform a specific task. They help keep code organized ("Don't Repeat Yourself"). In Python, we define them using the \`def\` keyword.`,
          codeExample: `def boot_system():
    print("Kernel Loading...")
    return True`
        },
        {
          id: 'params',
          number: '02',
          title: 'IO_INTERFACE',
          body: `Functions can take **Parameters** (inputs) and **Return** values (outputs). This allows them to process data and send results back to the main program.`,
          codeExample: `def add(x, y):
    return x + y

result = add(5, 3) # result is 8`
        }
      ],
      challenges: [
        {
          id: 'f1',
          level: 'LEVEL_01',
          title: 'BASIC_DECLARATION',
          task: `Define a function \`ping\` that returns the string \`"PONG"\`.`,
          xp: 200,
          validation: (globals) => typeof globals.get('ping') === 'function' && globals.get('ping')() === 'PONG'
        },
        {
          id: 'f2',
          level: 'LEVEL_02',
          title: 'ADDITION_MODULE',
          task: `Define a function \`calc_sum(a, b)\` that returns the sum of \`a\` and \`b\`.`,
          xp: 200,
          validation: (globals) => globals.get('calc_sum')(10, 5) === 15
        },
        {
          id: 'f3',
          level: 'LEVEL_03',
          title: 'BOOLEAN_VALIDATOR',
          task: `Define a function \`is_valid(val)\` that returns \`True\` if \`val\` is greater than \`100\`, and \`False\` otherwise.`,
          xp: 200,
          validation: (globals) => globals.get('is_valid')(150) === true && globals.get('is_valid')(50) === false
        },
        {
          id: 'f4',
          level: 'LEVEL_04',
          title: 'DEFAULT_PARAMETERS',
          task: `Define a function \`set_power(level=100)\` that returns the string \`"POWER_SET_TO_X"\` where X is the level.`,
          xp: 200,
          validation: (globals) => globals.get('set_power')() === 'POWER_SET_TO_100' && globals.get('set_power')(50) === 'POWER_SET_TO_50'
        },
        {
          id: 'f5',
          level: 'LEVEL_05',
          title: 'COMPLEX_RETURN',
          task: `Define \`get_status(error_count)\`. If \`error_count == 0\`, return \`"OK"\`. Otherwise, return \`"FAILED"\`.`,
          xp: 300,
          validation: (globals) => globals.get('get_status')(0) === 'OK' && globals.get('get_status')(5) === 'FAILED'
        }
      ]
    }
  },
  {
    id: 'arrays',
    number: '05',
    title: 'Arrays/Lists',
    icon: 'List',
    mastery: 0,
    level: 15,
    locked: true,
    content: {
      sections: [
        {
          id: 'lists',
          number: '01',
          title: 'LINEAR_BUFFERS',
          body: `A **List** is an ordered collection of items. In Python, lists can hold different data types, though they usually hold similar items.`,
          codeExample: `servers = ["alpha", "beta", "gamma"]`
        },
        {
          id: 'indexing',
          number: '02',
          title: 'INDEX_ACCESS',
          body: `Items in a list are accessed by their **Index**, starting at \`0\`. You can also slice lists to get a range of items.`,
          codeExample: `data = [10, 20, 30, 40]
first = data[0]    # 10
sub = data[1:3]    # [20, 30]`
        }
      ],
      challenges: [
        {
          id: 'a1',
          level: 'LEVEL_01',
          title: 'LIST_CREATION',
          task: `Create a list \`nodes\` containing strings: \`"N1"\`, \`"N2"\`, and \`"N3"\`.`,
          xp: 200,
          validation: (globals) => {
            const n = globals.get('nodes').toJs();
            return Array.isArray(n) && n.length === 3 && n[0] === 'N1';
          }
        },
        {
          id: 'a2',
          level: 'LEVEL_02',
          title: 'ELEMENT_RETRIEVAL',
          task: `Given the list \`vals = [100, 200, 300]\`, set \`target\` to the second item in the list.`,
          xp: 200,
          validation: (globals) => {
            globals.runPython("vals = [100, 200, 300]"); // Ensure context if needed, but usually incremental
            return globals.get('target') === 200;
          }
        },
        {
          id: 'a3',
          level: 'LEVEL_03',
          title: 'DYNAMIC_APPEND',
          task: `Create an empty list \`log\`. Append the values \`"START" \` and \`"STOP"\` to it in order.`,
          xp: 200,
          validation: (globals) => {
            const l = globals.get('log').toJs();
            return l[0] === 'START' && l[1] === 'STOP';
          }
        },
        {
          id: 'a4',
          level: 'LEVEL_04',
          title: 'LIST_SLICING',
          task: `Given \`nums = [0, 1, 2, 3, 4, 5]\`, set \`subset\` to a slice containing \`1, 2, 3\`.`,
          xp: 200,
          validation: (globals) => {
            const s = globals.get('subset').toJs();
            return s.length === 3 && s[0] === 1 && s[2] === 3;
          }
        },
        {
          id: 'a5',
          level: 'LEVEL_05',
          title: 'BUFFER_SIZE',
          task: `Create a list \`buffer\` with 5 zeros. Then set \`size\` to the length of the \`buffer\` using \`len()\`.`,
          xp: 300,
          validation: (globals) => globals.get('size') === 5
        }
      ]
    }
  },
  {
    id: 'objects',
    number: '06',
    title: 'Objects',
    icon: 'Box',
    mastery: 0,
    level: 18,
    locked: true,
    content: {
      sections: [
        {
          id: 'dicts',
          number: '01',
          title: 'KEY_VALUE_MAPS',
          body: `In Python, an **Object** is often represented by a **Dictionary**. It stores data in pairs that have a unique **Key** and its associated **Value**.`,
          codeExample: `user = {"id": 101, "name": "Zero"}`
        },
        {
          id: 'access',
          number: '02',
          title: 'RETRIEVAL_LOGIC',
          body: `You retrieve values by providing the key.`,
          codeExample: `name = user["name"] # "Zero"
user["online"] = True # Add new key`
        }
      ],
      challenges: [
        {
          id: 'o1',
          level: 'LEVEL_01',
          title: 'MAP_INITIALIZATION',
          task: `Create a dictionary \`config\` with keys \`"version"\` (value 1.0) and \`"active"\` (value \`True\`).`,
          xp: 200,
          validation: (globals) => {
            const c = globals.get('config').toJs();
            return c.get('version') === 1.0 && c.get('active') === true;
          }
        },
        {
          id: 'o2',
          level: 'LEVEL_02',
          title: 'VALUE_ACCESS',
          task: `Given \`meta = {"id": "INF-01"}\`, set \`current_id\` to the value of key \`"id"\`.`,
          xp: 200,
          validation: (globals) => globals.get('current_id') === 'INF-01'
        },
        {
          id: 'o3',
          level: 'LEVEL_03',
          title: 'ENTRY_UPDATE',
          task: `Given \`state = {"power": "LOW"}\`, update the \`"power"\` key to be \`"MAX"\`.`,
          xp: 200,
          validation: (globals) => {
            const s = globals.get('state').toJs();
            return s.get('power') === 'MAX';
          }
        },
        {
          id: 'o4',
          level: 'LEVEL_04',
          title: 'KEY_INSERTION',
          task: `Create an empty dict \`reg\`. Add the key \`"code"\` with value \`8822\`.`,
          xp: 200,
          validation: (globals) => globals.get('reg').toJs().get('code') === 8822
        },
        {
          id: 'o5',
          level: 'LEVEL_05',
          title: 'MEMBERSHIP_TEST',
          task: `Set \`has_key\` to \`True\` if the key \`"auth"\` exists in the dict \`data = {"auth": "secured"}\`. (Use the \`in\` operator).`,
          xp: 300,
          validation: (globals) => globals.get('has_key') === true
        }
      ]
    }
  },
  {
    id: 'scope',
    number: '07',
    title: 'Scope',
    icon: 'Focus',
    mastery: 0,
    level: 20,
    locked: true,
    content: {
      sections: [
        {
          id: 'scopes',
          number: '01',
          title: 'LOCAL_VS_GLOBAL',
          body: `**Scope** determines where a variable can be seen and accessed. **Global** variables are defined outside functions and are visible everywhere. **Local** variables exist only inside the function they were created in.`,
          codeExample: `X = 10 # Global

def test():
    Y = 5 # Local
    return X + Y`
        },
        {
          id: 'shadowing',
          number: '02',
          title: 'NAMESPACE_BARRIERS',
          body: `If you define a variable with the same name inside a function, it **shadows** the global one for that function only.`,
          codeExample: `V = 1
def change():
    V = 100 # Local V shadows global V`
        }
      ],
      challenges: [
        {
          id: 's1',
          level: 'LEVEL_01',
          title: 'GLOBAL_READ',
          task: `Define a global variable \`BASE_INT\` set to \`50\`. Then define a function \`get_val()\` that returns \`BASE_INT\`.`,
          xp: 200,
          validation: (globals) => globals.get('get_val')() === 50
        },
        {
          id: 's2',
          level: 'LEVEL_02',
          title: 'LOCAL_SHADOW',
          task: `Define a function \`shadow_test()\` that creates a local variable \`Z = 99\` and returns it.`,
          xp: 200,
          validation: (globals) => globals.get('shadow_test')() === 99
        },
        {
          id: 's3',
          level: 'LEVEL_03',
          title: 'GLOBAL_MODIFIER',
          task: `Define a function \`update_global()\` that uses the \`global\` keyword to change a global variable \`COUNTER\` to \`5\`.`,
          xp: 200,
          validation: (globals) => {
            globals.runPython("COUNTER = 0\nupdate_global()");
            return globals.get('COUNTER') === 5;
          }
        },
        {
          id: 's4',
          level: 'LEVEL_04',
          title: 'BLOCK_SCOPE',
          task: `In Python, variables defined in \`if\` blocks are still visible outside. Create an \`if True:\` block that defines \`temp = 42\`. Ensure \`temp\` is accessible.`,
          xp: 200,
          validation: (globals) => globals.get('temp') === 42
        },
        {
          id: 's5',
          level: 'LEVEL_05',
          title: 'SCOPE_HIERARCHY',
          task: `Define \`val = 10\`. Write a function \`check()\` that defines its own \`val = 20\`. \`check()\` should return the local \`val\`.`,
          xp: 300,
          validation: (globals) => globals.get('check')() === 20 && globals.get('val') === 10
        }
      ]
    }
  },
  {
    id: 'errors',
    number: '08',
    title: 'Error Handling',
    icon: 'Bug',
    mastery: 0,
    level: 22,
    locked: true,
    content: {
      sections: [
        {
          id: 'try-except',
          number: '01',
          title: 'EXCEPTION_CATCHING',
          body: `Programs crash when they encounter errors (Exceptions). We use **Try/Except** blocks to "catch" these errors and handle them instead of letting the system fail.`,
          codeExample: `try:
    x = 1 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")`
        },
        {
          id: 'finally',
          number: '02',
          title: 'RECOVERY_BLOCKS',
          body: `The \`finally\` block always runs, regardless of whether an error occurred. It can used for cleanup tasks like closing files.`,
          codeExample: `try:
    # process
except:
    # handle
finally:
    # cleanup`
        }
      ],
      challenges: [
        {
          id: 'e1',
          level: 'LEVEL_01',
          title: 'ZERO_DIV_GUARD',
          task: `Wrap \`x = 10 / 0\` in a \`try/except\` block. If an error occurs, set \`error_caught = True\`.`,
          xp: 200,
          validation: (globals) => globals.get('error_caught') === true
        },
        {
          id: 'e2',
          level: 'LEVEL_02',
          title: 'KEY_ERROR_CATCH',
          task: `Given \`d = {}\`, try to access \`d["key"]\`. Catch the \`KeyError\` and set \`status = "MISSING"\`.`,
          xp: 200,
          validation: (globals) => globals.get('status') === 'MISSING'
        },
        {
          id: 'e3',
          level: 'LEVEL_03',
          title: 'FINALLY_CLEANUP',
          task: `Use \`try/finally\`. Inside \`finally\`, set \`cleanup_done = True\`.`,
          xp: 200,
          validation: (globals) => globals.get('cleanup_done') === true
        },
        {
          id: 'e4',
          level: 'LEVEL_04',
          title: 'RAISE_EXCEPTION',
          task: `Define a function \`fail()\` that manually \`raise\`s a \`ValueError\`.`,
          xp: 200,
          validation: (globals) => {
            try { globals.get('fail')(); return false; } 
            catch(err) { return err.message.includes('ValueError'); }
          }
        },
        {
          id: 'e5',
          level: 'LEVEL_05',
          title: 'GENERIC_HANDLER',
          task: `Catch any exception using \`except Exception as e:\`. Inside, set \`error_msg = str(e)\`. Use \`1/0\` as the trigger.`,
          xp: 300,
          validation: (globals) => typeof globals.get('error_msg') === 'string'
        }
      ]
    }
  },
  {
    id: 'algorithms',
    number: '09',
    title: 'Algorithms',
    icon: 'Share2',
    mastery: 0,
    level: 25,
    locked: true,
    content: {
      sections: [
        {
          id: 'efficiency',
          number: '01',
          title: 'PROCEDURAL_EFFICIENCY',
          body: `An **Algorithm** is a step-by-step procedure for solving a problem. Different algorithms can solve the same problem with varying levels of speed and efficiency.`,
          codeExample: `def find_max(nums):
    max_val = nums[0]
    for n in nums:
        if n > max_val:
            max_val = n
    return max_val`
        },
        {
          id: 'sorting',
          number: '02',
          title: 'SORT_PATTERNS',
          body: `Sorting is a common algorithmic task. Python has built-in sorting, but understanding the underlying logic is important.`,
          codeExample: `nums = [3, 1, 4]
nums.sort() # [1, 3, 4]`
        }
      ],
      challenges: [
        {
          id: 'alg1',
          level: 'LEVEL_01',
          title: 'MAX_FINDER',
          task: `Write a function \`locate_max(nums)\` that implements your own logic to return the highest number in a list.`,
          xp: 200,
          validation: (globals) => globals.get('locate_max')([1, 5, 2, 8, 3]) === 8
        },
        {
          id: 'alg2',
          level: 'LEVEL_02',
          title: 'VALUE_COUNTER',
          task: `Write a function \`count_occ(data, target)\` that counts how many times \`target\` appears in the \`data\` list.`,
          xp: 200,
          validation: (globals) => globals.get('count_occ')([7, 1, 7, 2, 7], 7) === 3
        },
        {
          id: 'alg3',
          level: 'LEVEL_03',
          title: 'SEARCH_ALGORITHM',
          task: `Write a linear search function \`find_index(data, target)\` that returns the index of \`target\`. If not found, return \`-1\`.`,
          xp: 200,
          validation: (globals) => globals.get('find_index')([10, 20, 30], 20) === 1 && globals.get('find_index')([10, 20], 50) === -1
        },
        {
          id: 'alg4',
          level: 'LEVEL_04',
          title: 'DATA_FILTER',
          task: `Write a function \`get_positives(nums)\` that returns a new list containing only numbers greater than \`0\`.`,
          xp: 200,
          validation: (globals) => {
            const res = globals.get('get_positives')([-1, 2, -3, 4]).toJs();
            return res.length === 2 && res[1] === 4;
          }
        },
        {
          id: 'alg5',
          level: 'LEVEL_05',
          title: 'ARRAY_SUMMATION',
          task: `Create a recursive or iterative function \`total_sum(nums)\` that returns the sum of all elements in the list.`,
          xp: 300,
          validation: (globals) => globals.get('total_sum')([1, 2, 3, 4, 5]) === 15
        }
      ]
    }
  }
];

export const BADGES: Badge[] = [
  { id: 'variables', title: 'Variables & Data Types', icon: 'Database', unlocked: false },
  { id: 'conditionals', title: 'Conditionals (if/else)', icon: 'Split', unlocked: false },
  { id: 'loops', title: 'Loops (for/while)', icon: 'RotateCw', unlocked: false },
  { id: 'functions', title: 'Functions', icon: 'Sigma', unlocked: false },
  { id: 'arrays', title: 'Arrays/Lists', icon: 'List', unlocked: false },
  { id: 'objects', title: 'Objects', icon: 'Box', unlocked: false },
  { id: 'scope', title: 'Scope', icon: 'Focus', unlocked: false },
  { id: 'errors', title: 'Error Handling', icon: 'Bug', unlocked: false },
  { id: 'algorithms', title: 'Algorithms', icon: 'Share2', unlocked: false },
];
