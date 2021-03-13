import os
import sys
import random
import re
import urllib.request
import urllib.parse
import urllib.error
import http.cookiejar
import threading
import queue
import itertools
import time
import subprocess
import platform
import signal as sinyal
from colorama import Fore, Back, Style
from random import choice, uniform
from os import _exit
from psutil import Process, NoSuchProcess
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException, ElementClickInterceptedException, WebDriverException, ElementNotVisibleException
from selenium.webdriver.support import expected_conditions as EC
from fake_useragent import UserAgent
from os import devnull, environ
from os.path import isfile, join as path_join
from platform import system
from argparse import ArgumentParser
from requests import get as requests_get
from threading import Thread, Lock, enumerate as list_threads
from time import sleep


def exit(code):
    _exit(code)
    sys.exit()


def log(message):
    if isinstance(message, str):
        if message.startswith('[INFO]'):
            print(message+"\n")
        elif message.startswith('[ERROR]'):
            print('error')
        elif message.startswith('[WARNING]'):
            print('error warning')
    else:
        print(message)


def random_line(afile):
    lines = open(afile).read().splitlines()
    line = list(filter(None, lines))
    line = list(set(line))
    if not line or len(line) == 0:
        get_proxy()
        return random_line(afile)
    random.shuffle(line)
    picked = random.choice(line)
    regex = r"([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})"
    match = re.search(regex, picked)
    if match:
        return match.group(0)
    if not picked or len(picked) < 5:
        get_proxy()
        return random_line(afile)
    if len(picked) > 7:
        return picked
    else:
        return random_line(afile)


def random_proxy(file):
    randx = random_line(file)
    if ":" not in randx:
        return random_proxy(file)
    else:
        return randx


def is64bit():
    return sys.maxsize > 2**32 and platform.architecture()[0] == '64bit'


def hasPHP():
    try:
        subprocess.check_call(['php', '-v'])
        return True
    except:
        return False


def get_proxy():
    if hasPHP():
        if os.path.isfile('proxy.php'):
            subprocess.Popen(['php', 'proxy.php'],
                             stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        else:
            default_proxy()
    else:
        default_proxy()


def default_proxy():
    px = requests_get(
        'https://www.proxy-list.download/api/v1/get?type=https&anon=elite').content.decode().strip().split('\r\n')
    f = open(args.proxy, 'a')
    for i in range(len(px)):
        f.write(px[i]+"\n")
    f.close()


def delete_line(file, string, pid=0):
    print({'pid': pid, 'proxy': 'delete '+string+' from '+file})
    f = open(file, 'r')
    lst = []
    for line in f:
        line = line.replace(string, '')
        lst.append(line)
    f.close()
    f = open(file, 'w')
    for line in lst:
        f.write(line)
    f.close()


def parse_title(t, p, pid=0):
    global args
    if not t or not t.strip():
        delete_proxy(p, pid)
    if isinstance(t, str):
        if t.startswith('ERROR') or t.startswith('504') or t.startswith('404') or t.startswith('400') or t.startswith('500'):
            delete_proxy(p, pid)
    if t == 'Captcha' or t == 504 or isinstance(t, int) or t == '' or isurl(t):
        delete_proxy(p, pid)
    return t


def isurl(url):
    regex = re.compile(
        r'^(?:http|ftp)s?://'  # http:// or https://
        # domain...
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'
        r'localhost|'  # localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return re.match(regex, url) is not None


def parse_url(url):
    if isurl(url):
        return url
    elif os.path.isfile(url):
        return random_line(url)
    else:
        raise ValueError('URL doesnt match')


def loadriver(url, timeout, proxy, pid=0):
    global args
    ua = UserAgent()
    ua.update
    UA = ua.random
    __location__ = os.path.realpath(
        os.path.join(os.getcwd(), os.path.dirname(__file__)))
    if system() == 'Windows':
        if is64bit():
            executable_path = os.path.join(
                __location__, 'drivers', 'win', '64bit.exe')
        else:
            executable_path = os.path.join(
                __location__, 'drivers', 'win', '32bit.exe')
    elif system() == 'Linux':
        if is64bit():
            executable_path = os.path.join(
                __location__, 'drivers', 'unix', '64bit')
        else:
            executable_path = os.path.join(
                __location__, 'drivers', 'unix', '32bit')
    elif platform.mac_ver()[0]:
        executable_path = os.path.join(
            __location__, 'drivers', 'mac', 'geckodriver')
    else:
        print('OS undefined')
        sys.exit()
    log({
        'pid': pid,
        'url': url,
        'timeout': timeout,
        'proxy': proxy,
        'useragent': UA,
        'system': system(),
        'driver': executable_path,
        'OS': system(),
        '64bit': is64bit()
    })

    firefox_options = webdriver.FirefoxOptions()
    firefox_options.preferences.update({
        'media.volume_scale': '0.0',
        'general.useragent.override': UA,
        'network.proxy.type': 1,
        'network.proxy.http': proxy.split(':')[0],
        'network.proxy.http_port': int(proxy.split(':')[1]),
        'network.proxy.ssl': proxy.split(':')[0],
        'network.proxy.ssl_port': int(proxy.split(':')[1]),
        "browser.cache.disk.enable": False,
        "browser.cache.memory.enable": False,
        "browser.cache.offline.enable": False,
        "network.http.use-cache": False
    })
    try:
        driver = webdriver.Firefox(
            options=firefox_options, service_log_path=devnull, executable_path=executable_path)
        driver.set_page_load_timeout(timeout)
    except WebDriverException:
        delete_proxy(proxy, pid)
        return sys.exit()

    return driver


def element_visibled():
    return EC.visibility_of_element_located


def element_presence():
    return EC.presence_of_element_located


def search(video, pid=0):
    global args
    url = "https://www.youtube.com/results?search_query=" + str(video)
    proxy = random_line('proxy.txt')
    driver = loadriver(url, args.timeout, proxy)
    wait = WebDriverWait(driver, 3)
    play = WebDriverWait(driver, 100)
    visible = element_visibled()
    driver.get(url)

    # play the video
    try:
        wait.until(visible((By.ID, "video-title")))
        driver.find_element_by_id("video-title").click()
        play.until(time.sleep(60))
        driver.quit()
    except WebDriverException:
        print('driver Error')
        delete_proxy(proxy, pid)
        driver.quit()


def driver_quit(driver):
    driver.delete_all_cookies()
    driver.quit()


def delete_proxy(proxy, pid=0):
    global args
    delete_line(args.proxy, proxy, pid)


def get_redirect(url):
    ax = ['http://web.xcoid.com/redirect.php?url=', 'http://webreview.move.pk/redirect.php?url=',
          'https://www.website-review.ro/redirect.php?url=', 'http://www.seo.qubem.com/redirect.php?url=', 'https://www.powerplastics.co.uk/redirect.php?url=', 'https://www.website-review.ro/redirect.php?url=', 'https://services.thepamj.org/redirect.php?Url=', 'http://www.insideworld.com/redirect.php?url=', 'http://bilisim-kulubu.com/redirect.php?url=']
    fx = list(filter(None, ax))
    random.shuffle(fx)
    return random.choice(fx)+url


def parse_error(msg):
    if msg.find('error page'):
        return "Page Error"
    else:
        return msg


def driver_sleep(driver):
    global args
    sleep(args.duration)
    driver_quit(driver)


def bot(timeout, url, pid=0):
    global args
    proxy = random_proxy(args.proxy)
    driver = loadriver(url, timeout, proxy, pid)
    # search('L3n4r0x')
    visible = element_visibled()
    urlx = get_redirect(url)
    try:
        driver.get(urlx)
        if args.window == 'max':
            driver.maximize_window()
        else:
            driver.minimize_window()
        regex = r"[y|Y]ou[T|t]ube$"
        youtube = re.search(regex, driver.title)
        parse_title(driver.title, proxy, pid)
        print({
            'pid': pid, 'title': driver.title, 'youtube': driver.title.endswith('YouTube')
        })
        if youtube or driver.title.endswith('YouTube'):
            print({'pid': pid, 'youtube': 'Youtube Matched!'})
            play_button = driver.find_element_by_class_name(
                'ytp-play-button')
            play_button.click()
            play = re.search(r"[p|P](lay|utar)\s\(k\)",
                             play_button.get_attribute('title'))
            if play_button.get_attribute('title') == 'Play (k)' or play:
                play_button.click()
                print({'pid': pid, 'youtube': 'playing videos'})
            """if play_button.get_attribute('title') == 'Play (k)' or play:
                raise ElementClickInterceptedException"""
            """if not driver.title.startswith('ERROR') or driver.title.endswith('YouTube'):
                sleep(args.duration)"""
            driver_sleep(driver)
            print({'pid': pid, 'play': 'Video successfully viewed!'})
        else:
            WebDriverWait(driver, 3).until(visible((By.CLASS_NAME, "mctitle")))
            MGID = driver.find_element_by_class_name('mctitle')
            if MGID:
                print({'pid': pid, 'mgid': True})
                MGID.click()
            WebDriverWait(driver, 3).until(
                visible((By.CLASS_NAME, "adsbygoogle")))
            ADSENSE = driver.find_element_by_class_name('adsbygoogle')
            if ADSENSE:
                print({'pid': pid, 'adsense': True})
                ADSENSE.click()
            WebDriverWait(driver, 3).until(visible((By.ID, "skip_bu2tton")))
            ADFLY = driver.find_element_by_id('skip_bu2tton')
            if ADFLY:
                ADFLY.click()
                print({'pid': pid, 'adfly': True})
            if ADSENSE or MGID or ADFLY:
                driver_sleep(driver)
            else:
                driver.quit()

    except ConnectionError:
        print({'pid': pid, 'Error': 'Connection error'})
        driver.quit()
    except TimeoutException:
        print({'pid': pid, 'Timeout': args.timeout})
        driver.quit()
    except ElementNotVisibleException as e:
        print({'pid': pid, 'Element Not Found': str(e)})
        driver.quit()
    except WebDriverException as e:
        print({'pid': pid, "driver Error": parse_error(str(e))})
        delete_proxy(proxy, pid)
        driver.quit()
    except (KeyboardInterrupt, SystemExit):
        print({'pid': pid, 'Error': 'interupted by keyboard'})
        args.keluar = True
        driver.quit()
        sys.exit()


if __name__ == "__main__":
    sinyal.signal(sinyal.SIGINT, exit)
    try:
        parser = ArgumentParser()
        parser.add_argument(
            '-w', '--window', help='Maximize or minimize window', choices=['max', 'min'], default='min')
        parser.add_argument(
            '-ap', '--autoproxy', help='Auto proxy', choices=['no', 'yes'], default='yes')
        parser.add_argument(
            '-du', '--duration', help='set duration of view in seconds', type=float, default=60)
        parser.add_argument(
            '-m', '--max', help='max visits', type=int, default=3)
        parser.add_argument(
            '-p', '--proxy', help='set proxy file', default='proxy.txt')
        parser.add_argument(
            '-u', '--url', help='set url', default='urls.txt')
        parser.add_argument(
            '-t', '--timeout', help='Set timeout', type=int, default=300)
        parser.add_argument(
            '-d', '--delay', help='Set timeout', type=int, default=1)
        parser.add_argument(
            '-yt', '--youtube', help='Youtube execution', choices=['no', 'yes'], default='no')
        args = parser.parse_args()
        args.keluar = False
        pids = 0
        if args.autoproxy == 'yes':
            get_proxy()
        while True:
            for i in range(args.max):
                pids = pids+1
                t = Thread(target=bot, args=(
                    args.timeout, parse_url(args.url), pids))
                t.daemon = True
                t.start()
            for t in list_threads()[1:]:
                t.join()
            if args.keluar:
                break
            sleep(args.delay)

    except (KeyboardInterrupt, SystemExit):
        exit(1)
    except:
        exit(1)
